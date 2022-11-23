from flask.cli import AppGroup
from .users import seed_users, undo_users
from .spots import seed_spots,undo_spots
from .images import seed_images,undo_images
from .reviews import seed_reviews, undo_reviews
from .hosts import seed_hosts,undo_hosts
from .amenities import seed_amenities, undo_amenities
from .bookings import seed_bookings, undo_bookings
from .favorites import seed_favorites, undo_favorites

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
from app.models.db import db, environment, SCHEMA
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_users()
    seed_hosts()
    seed_spots()
    seed_images()
    seed_reviews()
    seed_amenities()
    seed_bookings()
    seed_favorites()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_hosts()
    undo_spots()
    undo_images()
    undo_reviews()
    undo_amenities()
    undo_bookings()
    undo_favorites()
    # Add other undo functions here
