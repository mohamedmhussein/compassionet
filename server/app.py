#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
# Local imports
from config import app, db, api
from models import User, Kindness, Comment, Category


# Views go here!
class Index(Resource):
    def get(self):
        return '<h1>Project Server</h1>'
class Signup(Resource):
    def post(self):
        json = request.get_json()
        user = User(
        username=json['username'],
        first_name=json["firstName"],
        last_name=json["lastName"],
        image_url=json['imageUrl'],
        email=json['email'])
        user.password_hash = request.get_json()['password']
        
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id

        return (
            {
                "id" : user.id,
                "username" : user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "image_url" : user.image_url,
                "email" : user.email
            }
        ), 201

class CheckSession(Resource):
    def get(self):
        user=User.query.filter(User.id == session.get('user_id')).first()

        if user:
            return (
                {
                    "id" : user.id,
                    "username" : user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "image_url" : user.image_url,
                    "email" : user.email
                }
            ),200
        else:
            return {"Message": "Unauthorized"}, 401

class Login(Resource):
    def post(self):

        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()
        
        if user:
            
            password = request.get_json()['password']

            if user.authenticate(password):
                session['user_id'] = user.id
                return (
                    {
                        "id" : user.id,
                        "username" : user.username,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "image_url" : user.image_url,
                        "email" : user.email
                    }
                ),201
        return {'error': 'Invalid username or password'}, 401   

class Logout(Resource):
    def delete(self):

        if session.get("user_id"):
            session['user_id'] = None
            return {}, 204
        return {"message": "unauthorized"}, 401

class Categories(Resource):
    def get(self):
        categories = [category.name for category in Category.query.all()]

        return  (categories),200

class AllKindnesses(Resource):
    def get(self):       

        kindnesses = []
        for kindness in Kindness.query.all():
            category=Category.query.filter(Category.id == kindness.category_id).first()
            user = User.query.filter(User.id == kindness.user_id).first()

            kindness_dict = {
                "id": kindness.id,
                "title": kindness.title,
                "description": kindness.description,
                "date": kindness.date,
                "category": category.name,
                "performer": user.username,
            }
            kindnesses.append(kindness_dict)

        return (kindnesses),200

class KindnessByID(Resource):
    def get(self, id):
        kindness = Kindness.query.filter_by(id=id).first()

        category=Category.query.filter_by(id=id).first()
        user = User.query.filter(User.id == kindness.user_id).first()

        kindness_dict = {
            "title": kindness.title,
            "description": kindness.description,
            "date": kindness.date,
            "category": category.name,
            "performer": user.username,
        }
        return kindness_dict, 200
    
    def delete(self, id):
        kindness = Kindness.query.filter_by(id=id).first()

        db.session.delete(kindness)
        db.session.commit()

        return "", 204
    def patch(self,id):
        kindness = Kindness.query.filter_by(id=id).first()
        json = request.get_json()
        category = Category.query.filter(Category.name == json['category']).first()        
        
        for attr in ['title', 'description', 'date']:
            setattr(kindness, attr, json[attr])
        kindness.category_id = category.id
        db.session.add(kindness)
        db.session.commit()

        return "",201
    
    def post(self,id):
        json = request.get_json()
        user=User.query.filter(User.id == session.get('user_id')).first()
        category = Category.query.filter(Category.name == json['category']).first()
        
        if user:
        
            try:
                kindness = Kindness(
                    title = json['title'],
                    description = json['description'],
                    date = json['date'],
                    user_id = session['user_id'],
                    category_id = category.id
                )
                db.session.add(kindness)
                db.session.commit()
            except IntegrityError:
                  return {"message":"Unprocessable Entity"}, 422  

            return (
                {
                    "title" : kindness.title,
                    "date" : kindness.date,
                    "description" : kindness.description,
                    "user_id" : kindness.user_id,
                    "category_id" : kindness.category_id  
                }
            ),201
        else:
            return {"message":"unauthorized"}, 401

class KindnessUser(Resource):
    def get(self):
        user=User.query.filter(User.id == session.get('user_id')).first()
        
        if user:
            kindnesses = []
            for kindness in Kindness.query.filter(Kindness.user_id == session.get('user_id')):
                category=Category.query.filter(Category.id == kindness.category_id).first()
                kindness_dict = {
                    "id": kindness.id,
                    "title": kindness.title,
                    "description": kindness.description,
                    "date": kindness.date,
                    "category": category.name,
                    "performer": user.username,
                }
                kindnesses.append(kindness_dict)

            return (kindnesses),200
        else:
            return {"message":"unauthorized"}, 401

    def post(self):
        json = request.get_json()
        user=User.query.filter(User.id == session.get('user_id')).first()
        category = Category.query.filter(Category.name == json['category']).first()
        
        if user:

        
            try:
                kindness = Kindness(
                    title = json['title'],
                    description = json['description'],
                    date = json['date'],
                    user_id = session['user_id'],
                    category_id = category.id
                )
                db.session.add(kindness)
                db.session.commit()
            except IntegrityError:
                  return {"message":"Unprocessable Entity"}, 422  

            return (
                {
                    "title" : kindness.title,
                    "date" : kindness.date,
                    "description" : kindness.description,
                    "user_id" : kindness.user_id,
                    "category_id" : kindness.category_id  
                }
            ),201
        else:
            return {"message":"unauthorized"}, 401

class Comments(Resource):
    def get(self,id):
        comments = Comment.query.filter(Comment.kindness_id==id).all()
        comment_dicts = []
        for comment in comments:
           user = User.query.get(comment.user_id)
           kindness = Kindness.query.get(comment.kindness_id)
           
           if user and kindness:
               comment_dict = {
                   "id": comment.id,
                   "text": comment.text,
                   "user": user.username,
                    "kindness": kindness.description
               }
               comment_dicts.append(comment_dict)

        return comment_dicts, 200

api.add_resource(Index, '/')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Categories, '/categories', endpoint='categories')
api.add_resource(KindnessUser, '/kindnessUser', endpoint='kindnessUser')
api.add_resource(AllKindnesses, '/allKindnesses', endpoint='allKindnesses')
api.add_resource(KindnessByID, '/kindness/<int:id>', endpoint='/kindness/<int:id>')
api.add_resource(Comments, '/comments/<int:id>', endpoint='/comments/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

