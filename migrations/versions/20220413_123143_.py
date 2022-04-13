"""empty message

Revision ID: 9260e98f46d0
Revises: b06c9280774e
Create Date: 2022-04-13 12:31:43.875735

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9260e98f46d0'
down_revision = 'b06c9280774e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('amenities', sa.Column('fire_extinguisher', sa.Boolean(), nullable=False))
    op.drop_column('amenities', 'first_extinguisher')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('amenities', sa.Column('first_extinguisher', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.drop_column('amenities', 'fire_extinguisher')
    # ### end Alembic commands ###