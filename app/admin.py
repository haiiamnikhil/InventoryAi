from django.contrib import admin
from .models import *
# Register your models here.


class UserModelAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'full_name', 'organisation_name', 'organisation_email',
                    'organisation_type', 'is_staff', 'is_active', 'is_superuser', 'date_joined', 'last_login')


class ProductTotalCountAdmin(admin.ModelAdmin):
    list_display = ('user', 'item', 'totalCount', 'lastUpdated')


class ProductCountHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'item', 'count', 'addedDate')


class UploadDataAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'detection_type',
                    'uploadedName', 'count', 'uploaded_at')


class UserPackageAdmin(admin.ModelAdmin):
    list_display = ('user', 'packageType', 'allotatedCounts',
                    'remainingCounts', 'subscriptionUpdatedOn', 'subscribedOn')


class BatchFileAdmin(admin.ModelAdmin):
    list_display = ('user', 'batchiId', 'fileName',
                    'objectType', 'objectCount')


admin.site.register(UserModel, UserModelAdmin)

admin.site.register(UploadData, UploadDataAdmin)

admin.site.register(UserCSVRecord)

admin.site.register(UserProcessCount)

admin.site.register(ProductTotalCount, ProductTotalCountAdmin)

admin.site.register(ProductCountHistory, ProductCountHistoryAdmin)

admin.site.register(UserPackage, UserPackageAdmin)

admin.site.register(BatchProcessing)

admin.site.register(BatchFile)

admin.site.register(GuestDetections)

admin.site.register(CameraCredentials)

admin.site.register(VideoDetection)

admin.site.register(VideoUpload)