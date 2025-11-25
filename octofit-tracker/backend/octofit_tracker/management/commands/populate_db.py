from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        users = [
            User.objects.create(name='Peter Parker', email='spiderman@marvel.com', team=marvel),
            User.objects.create(name='Tony Stark', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Bruce Wayne', email='batman@dc.com', team=dc),
            User.objects.create(name='Clark Kent', email='superman@dc.com', team=dc),
        ]

        # Create activities
        Activity.objects.create(user=users[0], type='Running', duration=30)
        Activity.objects.create(user=users[1], type='Cycling', duration=45)
        Activity.objects.create(user=users[2], type='Swimming', duration=60)
        Activity.objects.create(user=users[3], type='Yoga', duration=20)

        # Create workouts
        workout1 = Workout.objects.create(name='Pushups', description='Upper body strength')
        workout2 = Workout.objects.create(name='Cardio Blast', description='High intensity cardio')
        workout1.suggested_for.add(users[0], users[2])
        workout2.suggested_for.add(users[1], users[3])

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
