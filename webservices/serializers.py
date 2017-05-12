from django.contrib.auth.models import User
from rest_framework import serializers
from mainstreetadmin.models import *



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name','password','is_active')
        #read_only_fields = ('email',)


class LoanpurposeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loanpurpose
        fields = ('id', 'purpose_name', 'is_active')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ('id', 'question_text','question_type','question_order','created_date','modify_date','is_active','response','display_text','categorytype')

class LoanpurposeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loanpurpose
        fields = ('id', 'purpose_name', 'is_active')

class LoantypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loantype
        fields = ('typename',)

class LoanpurposeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loanpurpose
        fields = ('purpose_name',)

class BusinesscategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Businesscategory
        fields = ('category_name',)


class UserfacingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userfacingcategory
        fields = ('category_name',)


class LenderSerializer(serializers.ModelSerializer):
    loantype = LoantypeSerializer(source='fk_loantype',read_only=True)
    loanpurpose = LoanpurposeSerializer(source='fk_loan_purpose',read_only=True)
    businesscategory = BusinesscategorySerializer(source='fk_category',read_only=True)
    usercategory = UserfacingSerializer(source='fk_usercategory',read_only=True)
    class Meta:
        model = Lender
        fields = ('id', 'lender_name', 'min_business_time_month','max_business_time_month','min_fico','max_fico','min_revenue','max_revenue','min_loan_amount','max_loan_amount','min_apr','max_apr','min_simpleintrest','max_simpleintrest','invoice','is_active','created_date','fk_loantype','fk_loan_purpose','fk_usercategory','fk_category','loantype','loanpurpose','businesscategory','usercategory')