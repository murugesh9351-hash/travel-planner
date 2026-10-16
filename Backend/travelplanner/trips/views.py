from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from .models import Booking, Destination
from .serializers import (
    BookingSerializer,
    DestinationSerializer,
    LoginSerializer,
    RegisterSerializer,
)


@api_view(['GET'])
def test_api(request):
    return Response({
        "message": "Travel Planner API is working!"
    })


@api_view(['GET'])
def destination_list(request):
    destinations = Destination.objects.all()

    serializer = DestinationSerializer(
        destinations,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET', 'POST'])
def booking_list_create(request):

    if request.method == 'GET':
        bookings = Booking.objects.select_related(
            'destination',
            'user'
        ).all()

        serializer = BookingSerializer(
            bookings,
            many=True
        )

        return Response(serializer.data)

    serializer = BookingSerializer(
        data=request.data
    )

    serializer.is_valid(
        raise_exception=True
    )

    if request.user.is_authenticated:
        booking = serializer.save(
            user=request.user
        )
    else:
        booking = serializer.save()

    return Response(
        BookingSerializer(booking).data,
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
def register_user(request):

    serializer = RegisterSerializer(
        data=request.data
    )

    serializer.is_valid(
        raise_exception=True
    )

    user = serializer.save()

    return Response(
        {
            "message": "User registered successfully.",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        },
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
def login_user(request):

    serializer = LoginSerializer(
        data=request.data
    )

    serializer.is_valid(
        raise_exception=True
    )

    user = serializer.validated_data["user"]

    token, created = Token.objects.get_or_create(
        user=user
    )

    return Response(
        {
            "message": "Login successful.",
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):

    return Response(
        {
            "message": "Authentication successful.",
            "username": request.user.username,
        },
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookings(request):

    bookings = Booking.objects.select_related(
        'destination'
    ).filter(
        user=request.user
    ).order_by(
        '-created_at'
    )

    serializer = BookingSerializer(
        bookings,
        many=True
    )

    return Response(
        serializer.data
    )