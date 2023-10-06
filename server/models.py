from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
import bcrypt

from config import db

# Models go here!

# User-Kindness (Many-to-Many Relationship)
user_liked_kindnesses = db.Table('user_liked_kindnesses',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('kindness_id', db.Integer, db.ForeignKey('kindnesses.id'), primary_key=True)
)
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-kindness.user','-comments.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    first_name = db.Column(db.String, unique=False)
    last_name = db.Column(db.String, unique=False)
    image_url = db.Column(db.String, unique=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    #relationships (one-to-many)
    kindnesses = db.relationship('Kindness', backref='performer', lazy=True)
    comments = db.relationship('Comment', backref='commenter', lazy=True)
    liked = db.relationship('Kindness', secondary='user_liked_kindnesses', backref='liked_by')

    
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    # def password_hash(self):
    #     if self._password_hash:
    #         raise AttributeError('Password hashes may not be viewed.')
            

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Kindness(db.Model, SerializerMixin):
    __tablename__ = 'kindnesses'
    serialize_rules = ('-comments.kindness', '-liked_bys.kindness',)
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)

    #relationships
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer,db.ForeignKey('categories.id'), nullable=False)

    comments = db.relationship('Comment', backref='on_kindness', lazy=True)



class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    
    serialize_rules = ('-comments.kindness',)
    
    text = db.Column(db.String, nullable=False)

    # Link Comment to User and Kindness
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    kindness_id = db.Column(db.Integer, db.ForeignKey('kindnesses.id'), nullable=False)



class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    kindnesses = db.relationship('Kindness', backref='kindness', lazy=True)