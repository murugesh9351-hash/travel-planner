from django.urls import path

from .views import (
    booking_list_create,
    destination_list,
    login_user,
    logout_user,
    my_bookings,
    register_user,
    test_api,
)


urlpatterns = [
    path(
        'test/',
        test_api
    ),

    path(
        'destinations/',
        destination_list
    ),

    path(
        'bookings/',
        booking_list_create
    ),

    path(
        'register/',
        register_user
    ),

    path(
        'login/',
        login_user
    ),

    path(
        'logout/',
        logout_user
    ),

    path(
        'my-bookings/',
        my_bookings
    ),
]