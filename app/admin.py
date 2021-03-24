from django.contrib import admin
from .models import *
# Register your models here.

class UserModelAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'full_name', 'organisation_name','organisation_email','organisation_type','is_staff', 'is_active', 'is_superuser','date_joined','last_login')


class ProductTotalCountAdmin(admin.ModelAdmin):
    list_display = ('user','item','totalCount','lastUpdated')

admin.site.register(UserModel,UserModelAdmin)

admin.site.register(UploadData)

admin.site.register(UserCSVRecord)

admin.site.register(UserProcessCount)

admin.site.register(ProductTotalCount,ProductTotalCountAdmin)

admin.site.register(ProductCountHistory)