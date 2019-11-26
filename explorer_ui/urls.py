"""explorer_ui URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
# from django.contrib import admin
from django.views.generic import TemplateView
from app.views import (
    index,
    blocks,
    transactions,
    address
)

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    # url(r'^admin/', admin.site.urls),

    url(r'^api/index_base_info/', index.index_base_info),  # Trias Blockchain BaseInfo
    url(r'^api/index_latest_blocks/', index.index_latest_blocks),  # Latest Blocks 20 Numbers
    url(r'^api/index_recent_transactions/', index.index_recent_transactions),  # Recent Transactions 20 Numbers
    url(r'^api/search/', index.serach),  # Search From number/blockHash/txHash/address

    url(r'^api/all_blocks/', blocks.all_blocks),  # Blocks List
    url(r'^api/block_info/', blocks.block_info),  # Block Detail Info
    url(r'^api/block_transactions/', blocks.block_transactions),  # Transactions Of Block

    url(r'^api/all_transactions/', transactions.all_transactions),  # Transactions List
    url(r'^api/transaction_info/', transactions.transaction_info),  # Transaction Detail Info

    url(r'^api/address/', address.address_info),  # Address Detail Info
    url(r'^api/address_transactions/', address.address_transactions),  # Transactions Of Address
]
