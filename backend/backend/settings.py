import os

from pathlib import Path

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

SECRET_DJANGO_KEY = os.getenv("SECRET_DJANGO_KEY")
ACTUAL_MAIL = os.getenv("ACTUAL_MAIL")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR_2 = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = SECRET_DJANGO_KEY

DEBUG = False

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    # Custom
    'runs.apps.RunsConfig',
    'users.apps.UsersConfig',

    # Third-Party
    'rest_framework',
    'dj_rest_auth',
    'corsheaders',
    'rest_framework.authtoken',
    'allauth.socialaccount',

    'allauth',
    'allauth.account',
    'dj_rest_auth.registration',

    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.apple',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.instagram',
    'allauth.socialaccount.providers.twitter',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', # To comply with CORS
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
}

CORS_ORIGIN_WHITELIST = (
    'https://gv-tracker-frontend.herokuapp.com',
    # 'http://localhost:3000',
)

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'none'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = ACTUAL_MAIL
EMAIL_HOST_PASSWORD = MAIL_PASSWORD

SITE_ID = 1
ACCOUNT_USERNAME_BLACKLIST = []

ACCOUNT_USERNAME_VALIDATORS = 'users.validators.custom_username_validators'
ACCOUNT_ADAPTER = 'users.adapter.UsernameMaxAdapter'