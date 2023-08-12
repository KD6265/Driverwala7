from rest_framework import serializers
from account.models import User
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http  import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from  .utils import Util

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model = User
        fields = ('email','name','password','password2','tc')
        extra_kwargs = {
            'password':{'write_only':True}
        }
    def validate(self, attrs):
        password1 = attrs.get('password')
        password2 = attrs.get('password2')
        if password1 != password2:
            raise serializers.ValidationError("Password and confirmation password does't match")
        return attrs
    def create(self, validated_data):
        password2 = validated_data.pop('password2', None)
        return User.objects.create(**validated_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email','name']
        
class UserChangePasswordSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password','max_length':255,},write_only=True)
    class Meta:
        model  =  User
        fields = ['password', 'password2']
        extra_kwargs = {
            'password':{'write_only':True}
        }
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Password and confirmation password doesn't match")
        user.set_password(password)
        user.save()
        return super().validate(attrs)
    
class UserRestPasswordEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(style ={'input_type': 'email'},write_only =True)
    class Meta:
        model = User
        fields = ['email']
    
    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            bytes_uid= force_bytes(user.id)
            print("bytes_uid : ",bytes_uid)
            uid = urlsafe_base64_encode(bytes_uid)
            print("uid : ",uid)
            token  = PasswordResetTokenGenerator().make_token(user) 
            print("token : ",token)       
            link = 'http://localhost:3000/api/user/reset/' + uid + '/' + token
            print("url : ", link)
            #send email
            body ="Click following link to reset your password" + link
            data ={
                'subject': 'Reset your password',
                'body': body,
                'to_email':user.email,
            }
            print('User Email',user.email)
            Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError("You are not registered with this")

class UserSetRestPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(style={'max_length': 255, 'input_type': 'password'}, required=True, write_only=True)
    password2 = serializers.CharField(style={'max_length': 255, 'input_type': 'password'}, required=True, write_only=True)

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError('password and confirm password are not the same')
        return attrs

    def create(self, validated_data):
        uid = self.context.get('uid')
        token = self.context.get('token')

        try:
            de_id = urlsafe_base64_decode(uid)
            id = smart_str(de_id)
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('token is invalid or expired')

            password = validated_data.get('password')
            User.set_password(user, password)
            user.save()
        except DjangoUnicodeDecodeError as e:
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError('token is invalid or expired')
        except Exception as e:
            raise e

        return validated_data


from rest_framework import serializers
from .models import Driver, State, District, Subdistrict, DriverType, Plan

class DriverRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    cpassword = serializers.CharField(write_only=True)
    fname = serializers.CharField(write_only=True,style ={'class':'form-control','name':'fname','id':'fname','placeholder':'first name'},max_length=50)
    class Meta:
        model = Driver
        fields = ('id', 'fname', 'mname', 'lname', 'age', 'phone', 'email', 'state', 'district', 'subdistrict',
                  'address', 'zipcode', 'aadharno', 'vytpe', 'driver_type', 'driving_licence', 'selfie',
                  'password', 'cpassword', 'plan')

    def create(self, validated_data):
        password = validated_data.pop('password')
        cpassword = validated_data.pop('cpassword')
        if password != cpassword:
            raise serializers.ValidationError("Passwords do not match")

        driver = Driver.objects.create(**validated_data)
        driver.set_password(password)
        driver.save()
        return driver
