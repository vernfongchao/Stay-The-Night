"""empty message

Revision ID: 3aaa036e9501
Revises: eaeb70837b1b
Create Date: 2022-04-15 20:52:42.789817

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3aaa036e9501'
down_revision = 'eaeb70837b1b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('hosts', sa.Column('country', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('hosts', 'country')
    # ### end Alembic commands ###
