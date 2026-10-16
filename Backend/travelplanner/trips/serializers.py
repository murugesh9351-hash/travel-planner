import re
from decimal import Decimal

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import serializers

from .models import Booking, Destination


class DestinationSerializer(serializers.ModelSerializer):
    # Keep your existing DestinationSerializer if you already have one.
    class Meta:
        model = Destination
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8
    )
    password2 = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
            "password2",
        )

    def validate_email(self, value):
        value = value.strip().lower()

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )

        return value

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({
                "password2": "Passwords do not match."
            })

        return data

    def create(self, validated_data):
        validated_data.pop("password2")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:
            raise serializers.ValidationError(
                "Invalid username or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "This account is inactive."
            )

        data["user"] = user

        return data


class BookingSerializer(serializers.ModelSerializer):
    destination_details = DestinationSerializer(
        source="destination",
        read_only=True
    )

    class Meta:
        model = Booking
        fields = (
            "booking_id",
            "user",
            "destination",
            "destination_details",
            "customer_name",
            "email",
            "phone",
            "travel_date",
            "guests",
            "price_per_person",
            "total_amount",
            "duration",
            "booking_type",
            "status",
            "created_at",
        )
        read_only_fields = (
            "booking_id",
            "user",
            "price_per_person",
            "total_amount",
            "status",
            "created_at",
            "destination_details",
        )

    def validate_customer_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Customer name must not be empty."
            )

        return value

    def validate_phone(self, value):
        value = value.strip()
        digits = re.sub(r"\D", "", value)

        if (
            not re.fullmatch(r"\+?[0-9().\s-]+", value)
            or not 10 <= len(digits) <= 15
        ):
            raise serializers.ValidationError(
                "Enter a valid phone number."
            )

        return value

    def validate_destination(self, value):
        if value.price < 0:
            raise serializers.ValidationError(
                "Destination price must not be negative."
            )

        return value

    def validate_guests(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Guests must be at least 1."
            )

        return value

    def validate_travel_date(self, value):
        if value < timezone.localdate():
            raise serializers.ValidationError(
                "Travel date must not be in the past."
            )

        return value

    def create(self, validated_data):
        destination = validated_data["destination"]
        guests = validated_data["guests"]

        price_per_person = Decimal(destination.price)

        validated_data["price_per_person"] = price_per_person
        validated_data["total_amount"] = price_per_person * guests

        return super().create(validated_data)