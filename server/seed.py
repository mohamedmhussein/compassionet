#!/usr/bin/env python3

# Standard library imports
import random
import datetime
import bcrypt
# Remote library imports
from faker import Faker

# Local imports
from config import app
from models import db, User, Kindness, Comment, Category
fake = Faker()

# Create sample data
def create_sample_data():
    # Create users
    User.query.delete()
    users = []
    for _ in range(10):
        password = 'sample_password'  
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        user = User(
            username=fake.user_name(),
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            image_url='https://images.unsplash.com/photo-1626480145636-a733bcfdcbc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
            email=fake.email(),
            _password_hash=password_hash,
        )
        users.append(user)
    
    db.session.add_all(users)
    db.session.commit()
    
    # Create categories with meaningful names
    Category.query.delete()
    category_names = [
        'Community Service',
        'Random Acts of Kindness',
        'Helping the Homeless',
        'Environmental Stewardship',
        'Supporting Education',
        'Animal Welfare',
        'Health and Wellness',
        'Elderly Care',
        'Youth Development',
        'Cultural Preservation',
        'Emergency Relief',
        'Promoting Equality',
        'Clean Energy Initiatives',
        'Food Security',
        'Mental Health Support',
        'Arts and Culture'
    ]

    categories = [Category(name=name) for name in category_names]
    
    db.session.add_all(categories)
    db.session.commit()
    
    # Create acts of kindness
    Kindness.query.delete()
    kindnesses = []
    for _ in range(20):
        kindness = Kindness(
            title=fake.sentence(),
            description=fake.paragraph(),
            date=fake.date_time_between(start_date='-30d', end_date='now').strftime('%Y-%m-%d'),
            user_id=random.randint(1, 10),
            category_id=random.randint(1, 16)
        )
        kindnesses.append(kindness)
    
    db.session.add_all(kindnesses)
    db.session.commit()
    
    # Create comments
    Comment.query.delete()
    comments = []
    for _ in range(30):
        comment = Comment(
            text=fake.paragraph(),
            user_id =random.randint(1, 10),
            kindness_id=random.randint(1, 20)
        )
        comments.append(comment)
    
    db.session.add_all(comments)
    db.session.commit()
    
    # Create likes (randomly like kindnesses)
    for _ in range(50):
        user = random.choice(users)
        kindness = random.choice(kindnesses)
        if kindness not in user.liked:
            user.liked.append(kindness)
    
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        create_sample_data()
