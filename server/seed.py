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


def create_sample_data():
    # Create users
    users = []
    for _ in range(10):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')) 
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            _password_hash=password_hash,
        )
        users.append(user)
    
    db.session.add_all(users)
    db.session.commit()
    
    # Create categories
    category_names = ['Community Service', 'Random Acts of Kindness', 'Helping the Homeless', 'Environmental Stewardship', 'Supporting Education']
    categories = [Category(name=name) for name in category_names]
    
    db.session.add_all(categories)
    db.session.commit()
    
    # Create acts of kindness
    kindnesses = []
    for _ in range(20):
        kindness = Kindness(
            title=fake.sentence(),
            description=fake.paragraph(),
            date=fake.date_time_between(start_date='-30d', end_date='now').strftime('%Y-%m-%d'),
            user=random.choice(users),
            category=random.choice(categories)
        )
        kindnesses.append(kindness)
    
    db.session.add_all(kindnesses)
    db.session.commit()
    
    # Create comments
    comments = []
    for _ in range(30):
        comment = Comment(
            text=fake.paragraph(),
            user_id=random.choice(users).id,
            kindness_id=random.choice(kindnesses).id  
        )
        comments.append(comment)
    
    db.session.add_all(comments)
    db.session.commit()
    
    # Create likes (randomly like kindnesses)
    for _ in range(50):
        user = random.choice(users)
        kindness = random.choice(kindnesses)
        if kindness not in user.liked_kindness:
            user.liked_kindness.append(kindness)
    
    db.session.commit()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        create_sample_data()
