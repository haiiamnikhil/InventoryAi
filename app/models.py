from django.db import models
import random
import string
import os
from django.contrib.auth.models import AbstractUser
from datetime import datetime as dt


USER_TYPE = (
    ('Business', 'Business'),
    ('Computer and Information Technology', 'Computer and Information Technology'),
    ('Export', 'Export'),
    ('Government', 'Government'),
    ('Others', 'Others')
)


DETECTION_TYPE = (
    ('Single', 'Single'),
    ('Multiple', 'Multiple')
)


def file_rename(instance, filename):
    upload_to = 'img'
    name, ext = os.path.splitext(filename)
    if instance.pk:
        filename = f"{filename}{ext}"
    else:
        filename = f"{name}-{''.join(random.choices(string.ascii_lowercase+string.digits,k=8))}{ext}"

    return os.path.join(upload_to, filename)


class UserModel(AbstractUser):
    USERNAME_FIELD = 'username'
    REQUIRED_FIELD = ['email', 'password']
    full_name = models.CharField(
        max_length=100, unique=False, null=True, blank=False)
    organisation_name = models.CharField(
        max_length=100, unique=False, blank=False, null=True)
    organisation_email = models.EmailField(
        max_length=100, unique=False, blank=False, null=True)
    organisation_strength = models.CharField(
        max_length=10, blank=True, null=True)
    organisation_type = models.CharField(max_length=50, choices=USER_TYPE)

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name_plural = "User Model"


class UserPackage(models.Model):
    user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, null=True, blank=False)
    packageType = models.CharField(
        max_length=50, null=True, blank=False, unique=False)
    allotatedCounts = models.BigIntegerField(
        unique=False, default=0, null=True, blank=False)
    remainingCounts = models.BigIntegerField(
        unique=False, default=0, null=True, blank=False)
    subscriptionUpdatedOn = models.DateField(auto_now=True)
    subscribedOn = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.user)
    
    class Meta:
        verbose_name_plural = "User Package"


class UploadData(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=True)
    category = models.CharField(
        max_length=20, null=True, blank=False, unique=False)
    detection_type = models.CharField(
        max_length=50, choices=DETECTION_TYPE, unique=False, blank=False, null=True)
    uploadedName = models.CharField(
        max_length=100, unique=False, blank=False, null=True)
    filename = models.CharField(
        max_length=100, unique=False, blank=True, null=True)
    image = models.ImageField(upload_to=file_rename, blank=True, null=True)
    singledetection = models.ImageField(
        upload_to='singledetection/', blank=True, null=True)
    multidetection = models.ImageField(
        upload_to='multidetection/', blank=True, null=True)
    count = models.CharField(max_length=10, blank=True, null=True)
    uploaded_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.filename
    
    class Meta:
        verbose_name_plural = "Upload Data"


class UserProcessCount(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=True)
    totalCount = models.BigIntegerField(
        unique=False, null=True, blank=True, default=0)
    singleCount = models.BigIntegerField(
        null=True, blank=True, unique=False, default=0)
    multiCount = models.BigIntegerField(
        null=True, blank=True, unique=False, default=0)
    processDate = models.DateField(auto_now=True, null=True)

    def __str__(self):
        return str(self.user)
    
    class Meta:
        verbose_name_plural = "User Process Count"


class ProductTotalCount(models.Model):
    user = models.ForeignKey(UserModel, null=True,
                             blank=False, on_delete=models.CASCADE)
    item = models.CharField(max_length=50, blank=False,
                            unique=False, null=True)
    totalCount = models.BigIntegerField(
        null=True, blank=False, default=0, unique=False)
    lastUpdated = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.user)
    
    class Meta:
        verbose_name_plural = "Product Total Count"


class ProductCountHistory(models.Model):
    user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, null=True, blank=False)
    item = models.CharField(
        max_length=100, unique=False, null=True, blank=False)
    count = models.BigIntegerField(
        null=True, blank=False, unique=False, default=0)
    addedDate = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.user)
    
    class Meta:
        verbose_name_plural = "Product Count History"


class BatchProcessing(models.Model):
    user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, null=True, blank=False)
    batchName = models.CharField(
        max_length=50, unique=False, null=True, blank=False)
    batchObjectName = models.CharField(
        max_length=50, unique=False, blank=False, null=True)
    batchFileCount = models.BigIntegerField(null=True, blank=False, default=0)
    batchItemsTotalCount = models.BigIntegerField(
        null=True, blank=False, default=0)
    created = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.batchName)
    
    class Meta:
        verbose_name_plural = "Batch Processing"


class BatchFile(models.Model):
    user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, null=True, blank=False)
    batchName = models.ForeignKey(
        BatchProcessing, blank=False, null=True, on_delete=models.CASCADE)
    fileName = models.CharField(
        max_length=100, unique=False, blank=False, null=True)
    ObjectType = models.CharField(
        max_length=50, unique=False, blank=False, null=True)
    ObjectCount = models.BigIntegerField(null=True, blank=False, default=0)
    created = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.batchName)
    
    class Meta:
        verbose_name_plural = "Batch File"
        

class UserCSVRecord(models.Model):
    user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, null=True, blank=False)
    batchName = models.ForeignKey(BatchProcessing, on_delete=models.CASCADE,null=True, blank=False)
    filename = models.CharField(
        max_length=100, unique=False, null=True, blank=True)
    csvFile = models.FileField(upload_to='reports/', blank=True, null=True)
    date = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.filename)
    
    class Meta:
        verbose_name_plural = "User CSV Record"


class GuestDetections(models.Model):
    filename = models.CharField(max_length=100, unique=False, null=True, blank=False)
    uploadFile = models.FileField(upload_to="Guest-Detections/",blank= False, null=True, unique=False)
    detectedFile = models.FileField(upload_to="Guest-Detections/detected/",blank=False, null=True, unique=False)
    uploaderIp = models.CharField(max_length=50, unique=False, blank=False, null=True)
    detectClass = models.CharField(max_length=50, unique=False, blank=False, null=True)
    count = models.IntegerField(null=True, blank=False, unique=False, default=0)
    uploaded_at = models.DateField(auto_now=True)
    
    def __str__(self):
        return str(self.uploaderIp)
    
    class Meta:
        verbose_name_plural = "Guest Detection"
        
        
class VideoDetection(models.Model):
    user = models.ForeignKey(UserModel,null=True, blank=False, unique=False, on_delete=models.CASCADE)
    filaname = models.CharField(max_length=100, default=f"VID-REC-{UserModel.get_username}-{dt.now().strftime('%Y-%m-%d')}")
    detectedVideo = models.FileField(upload_to="DetectedVideo",blank=False,null=True,unique=False)
    processDate = models.DateField(auto_now=True)
    
    def __str__(self):
        return str(self.detectedVideo.name)
    
    class Meta:
        verbose_name_plural = "User Video Detections"
        

class CameraCredentials(models.Model):
    user = models.ForeignKey(UserModel,null=True,blank=False, unique=False, on_delete=models.CASCADE)
    cameraUsername = models.CharField(max_length=50, unique=False, blank=False, null=True)
    cameraPassword = models.CharField(max_length=100,unique=False,null=True, blank=False)
    cameraIp = models.CharField(max_length=50, unique=False, blank=False, null=True)
    cameraPort = models.CharField(max_length=20,unique=False,null=True, blank=False)
    
    def __str__(self):
        return str(self.user)
    
    class Meta:
        verbose_name_plural = "Camera Credentials"


class VideoUpload(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=True, blank= False, unique=False)
    fileName = models.CharField(max_length=100, unique=False, null=True, blank=False)
    detectedClass = models.CharField(max_length=50,unique=False, blank=False, null=True)
    videoFile = models.FileField(upload_to='Uploaded-Video',blank=True,null=True)
    detectedVideo = models.FileField(upload_to='User-Upload-Detected-Video',null=True, blank=False)
    uploadDate = models.DateField(null=True, auto_now=True)

    class Meta:
        verbose_name_plural = "User Video Upload"

    def __str__(self):
        return str(self.user)