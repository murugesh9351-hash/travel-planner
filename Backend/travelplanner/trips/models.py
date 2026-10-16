import uuid

from django.db import models


class Destination(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    emoji = models.CharField(max_length=10, blank=True)
    img_url = models.URLField(blank=True, null=True)

    description = models.TextField(blank=True)
    best_time = models.CharField(max_length=200, blank=True)
    famous_for = models.CharField(max_length=300, blank=True)
    attractions = models.TextField(blank=True)
    travel_tips = models.TextField(blank=True)

    price = models.PositiveIntegerField(default=0)
    duration = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = "Pending", "Pending"
        CONFIRMED = "Confirmed", "Confirmed"
        CANCELLED = "Cancelled", "Cancelled"
        COMPLETED = "Completed", "Completed"

    user = models.ForeignKey(
        "auth.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="bookings",
    )

    booking_id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
    )

    destination = models.ForeignKey(
        Destination,
        on_delete=models.PROTECT,
        related_name="bookings",
    )

    customer_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    travel_date = models.DateField()
    guests = models.PositiveIntegerField()

    price_per_person = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    duration = models.CharField(max_length=100)
    booking_type = models.CharField(max_length=100)

    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.PENDING,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"{self.booking_id} - "
            f"{self.customer_name} ({self.destination})"
        )