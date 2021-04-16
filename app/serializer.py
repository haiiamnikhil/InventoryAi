from rest_framework import serializers
from .models import BatchFile, BatchProcessing, GuestDetections, ProductCountHistory, ProductTotalCount, UploadData, UserCSVRecord, UserModel, UserPackage, UserProcessCount


class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadData
        fields = '__all__'


class CsvSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCSVRecord
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'


class RecordsCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProcessCount
        fields = '__all__'


class ProductTotalCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTotalCount
        fields = '__all__'


class ProductCountHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCountHistory
        fields = '__all__'


class SingleDetectionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadData
        fields = ['uploadedName', 'category', 'count', 'uploaded_at']


class MultiDetectionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadData
        fields = ['uploadedName', 'category', 'count', 'uploaded_at']


class UserPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPackage
        fields = '__all__'


class BatchFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = BatchFile
        fields = '__all__'
    
    
class BatchProcessingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BatchProcessing
        fields = '__all__'
        
class GuestImageProcessingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = GuestDetections
        fields = '__all__'