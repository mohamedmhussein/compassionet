from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    #relationships
    kindness = db.relationship('Kindness', backref='performer', lazy=True)
    comments = db.relationship('Comment', backref='commenter', lazy=True)
    liked_kindness = db.relationship('Kindness', secondary='like', back_populates='liked_by')

    # reltionships
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    liked_by = db.relationship('User', secondary='like', back_populates='liked_kindness')
    comments = db.relationship('Comment', backref='on_kindness', lazy=True)

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Kindness(db.Model, SerializerMixin):
    __tablename__ = 'kindnesses'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)

    #relationships
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'), nullable=False)

    liked_by = db.relationship('User', secondary='like', back_populates='liked_kindness')
    comments = db.relationship('Comment', backref='on_kindness', lazy=True)

# Like Model (Many-to-Many Relationship)
like = db.Table('like',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('kindness_id', db.Integer, db.ForeignKey('kindness.id'), primary_key=True)
)

class Comment(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)

    # Link Comment to User and Kindness
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    kindness_id = db.Column(db.Integer, db.ForeignKey('kindness.id'), nullable=False)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)

# user-category model
user_category = db.Table('user_category',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('category.id'), primary_key=True)
)