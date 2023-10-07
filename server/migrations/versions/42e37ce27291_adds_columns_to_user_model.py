"""Adds columns to User model

Revision ID: 42e37ce27291
Revises: 
Create Date: 2023-10-06 13:59:25.310980

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '42e37ce27291'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('kindnesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('date', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], name=op.f('fk_kindnesses_category_id_categories')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_kindnesses_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('kindness_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['kindness_id'], ['kindnesses.id'], name=op.f('fk_comments_kindness_id_kindnesses')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_comments_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_liked_kindnesses',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('kindness_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['kindness_id'], ['kindnesses.id'], name=op.f('fk_user_liked_kindnesses_kindness_id_kindnesses')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_liked_kindnesses_user_id_users')),
    sa.PrimaryKeyConstraint('user_id', 'kindness_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_liked_kindnesses')
    op.drop_table('comments')
    op.drop_table('kindnesses')
    op.drop_table('users')
    op.drop_table('categories')
    # ### end Alembic commands ###