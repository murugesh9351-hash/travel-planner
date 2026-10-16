
from django.contrib import admin
from .models import Booking, Destination


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "region",
        "country",
        "best_time",
    )

    search_fields = (
        "name",
        "region",
        "country",
        "famous_for",
    )


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "booking_id",
        "customer_name",
        "destination",
        "travel_date",
        "guests",
        "total_amount",
        "status",
        "created_at",
    )
    search_fields = (
        "booking_id",
        "customer_name",
        "email",
        "phone",
        "destination__name",
    )
    list_filter = (
        "status",
        "booking_type",
        "travel_date",
        "created_at",
    )
    ordering = ("-created_at",)

