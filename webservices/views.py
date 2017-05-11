from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from mainstreetuser.models import *
from mainstreetadmin.models import *
from webservices.serializers import *
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes, api_view
import re,base64, time
from django.contrib.auth import authenticate
from django.core.mail import send_mail, EmailMultiAlternatives
from django.test import Client

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter(~Q(is_superuser=1) & Q(is_active=1))

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            #serializer.save()
            return Response({'status': 'OK', 'message': '', 'data': data})
        else:
            return Response({'status': 'ERROR', 'message': serializer.errors, 'data': ''})

class LoanpurposeViewSet(viewsets.ModelViewSet):
    serializer_class = LoanpurposeSerializer
    queryset = Loanpurpose.objects.filter(~Q(is_active=0))


class QuestionViewSet(viewsets.ModelViewSet):
    """
    This function is used for Question CRUD
    """
    serializer_class = QuestionSerializer
    queryset = Questions.objects.filter(~Q(is_active=0))

class LenderViewSet(viewsets.ModelViewSet):
    """
    This function is used for Lender CRUD
    """
    serializer_class = LenderSerializer
    queryset = Lender.objects.filter(~Q(is_active=0))


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def userregistration(request):
    """
    This function is used for user registration
    """
    email = request.POST['email'].strip()
    firstname = request.POST['firstname'].strip()
    lastname = request.POST['lastname'].strip()
    password = request.POST['password'].strip()
    mobile = request.POST['mobile'].strip()
    if User.objects.filter(email=email).exists() == True:
        return Response({'status': 'ERROR', 'message': 'This email already exists!', 'data': ''})
    else:
        highest_user_id = User.objects.all().order_by('-id')[0].id
        leading_part_of_email = email.split('@', 1)[0]
        leading_part_of_email = re.sub(r'[^a-zA-Z0-9+]', '', leading_part_of_email)  # remove non-alphanumerics
        truncated_part_of_email = leading_part_of_email[:3] + leading_part_of_email[-3:]  # first three
        derived_username = '%s%s' % (truncated_part_of_email, highest_user_id + 1)
        user = User.objects.create(username=derived_username, email=email, first_name=firstname, last_name=lastname, is_staff=0,
                                   is_active=1)
        u = User.objects.get(username=derived_username)
        u.set_password(password)
        u.save()
        userData = Userprofile.objects.create(user_id=u.id, mobile=mobile)
        alldata = []
        returndata = {}
        returndata['id'] = u.id
        returndata['email'] = email
        returndata['first_name'] = firstname
        returndata['last_name'] = lastname
        returndata['username'] = derived_username
        returndata['mobile'] = mobile
        alldata.append(returndata)
        return Response({'status': 'OK', 'message': 'You have successfully registered.', 'data': returndata})




@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def adminlogin(request):  #adminlogin
    """
    This function is used for admin login
    """
    user_name = request.POST['useremail'].strip()
    user_password = request.POST['password'].strip()
    user = authenticate(username=user_name, password=user_password)
    if user is not None and user.is_superuser :
        alldata = {}
        alldata['id'] = user.id
        alldata['username'] = user_name
        alldata['password'] = user_password
        alldata['first_name'] = user.first_name
        alldata['last_name'] = user.last_name
        alldata['email'] = user.email
        alldata['token'] = base64.b64encode(str(user.email)+str(user_password))
        if int(user.is_active) == int(1):
            return Response({'status': 'OK', 'message': 'You have successfully login.', 'data': alldata})
        else:
            return Response({'status': 'ERROR', 'message': 'This account is inactive.', 'data': ''})
    else:
        return Response({'status': 'ERROR', 'message': 'Username or password incorrect.', 'data': ''})


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def login(request):  #login
    """
    This function is used for user login
    """
    user_name = request.POST['useremail'].strip()
    user_password = request.POST['password'].strip()
    user = authenticate(username=user_name, password=user_password)
    if user is not None:
        alldata = {}
        alldata['id'] = user.id
        alldata['username'] = user_name
        alldata['password'] = user_password
        alldata['first_name'] = user.first_name
        alldata['last_name'] = user.last_name
        alldata['email'] = user.email
        alldata['token'] = base64.b64encode(str(user.email)+str(user_password))
        if int(user.is_active) == int(1):
            return Response({'status': 'OK', 'message': 'You have successfully login.', 'data': alldata})
        else:
            return Response({'status': 'ERROR', 'message': 'This account is inactive.', 'data': ''})
    else:
        return Response({'status': 'ERROR', 'message': 'Username or password incorrect.', 'data': ''})



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def logintestcase(request):
    c = Client()
    response = c.post('http://10.10.10.18:8000/webservices/v1/login/', {'useremail': 'john', 'password': 'smith'})

    return Response({'data': str(response)})


@api_view(['GET'])
def useranswers(request):
    loanamount = request.POST['loanamount'].strip()
    businessstarttime = request.POST['businessstarttime'].strip()
    loanpurpose = request.POST['loanpurpose'].strip()
    creditscore = request.POST['creditscore'].strip()
    totalsale = request.POST['totalsale'].strip()
    avgmonthlysale = request.POST['avgmonthlysale'].strip()
    invoice = request.POST['invoice'].strip()

    return Response({'status': 'ERROR', 'message': 'Username or password incorrect.', 'data': ''})




