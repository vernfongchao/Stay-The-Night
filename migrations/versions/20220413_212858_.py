"""empty message

Revision ID: 30770fd1c723
Revises: 9260e98f46d0
Create Date: 2022-04-13 21:28:58.152311

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '30770fd1c723'
down_revision = '9260e98f46d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('amenities', sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    op.add_column('amenities', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('amenities', 'updated_at')
    op.drop_column('amenities', 'created_at')
    # ### end Alembic commands ###
