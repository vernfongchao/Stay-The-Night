"""empty message

Revision ID: 986bd0fec152
Revises: 3aaa036e9501
Create Date: 2022-04-19 15:10:09.490987

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '986bd0fec152'
down_revision = '3aaa036e9501'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('spot_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['spot_id'], ['spots.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorites')
    # ### end Alembic commands ###
