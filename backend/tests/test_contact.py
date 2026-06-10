import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')

class TestContactAPI:
    """Tests for Matrix Energia 360 contact form API"""

    def test_health(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert "Matrix" in r.json().get("message", "")

    def test_contact_submit_success(self):
        payload = {
            "name": "TEST_João Silva",
            "email": "test@example.com",
            "phone": "(11) 99999-9999",
            "average_bill": "350",
            "message": "Teste automatizado"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "success"
        assert "message" in data

    def test_contact_missing_required_field(self):
        payload = {
            "name": "TEST_João",
            "email": "test@example.com",
            # missing phone and average_bill
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422  # Validation error

    def test_contact_no_message_field(self):
        """Message is optional"""
        payload = {
            "name": "TEST_Maria",
            "email": "maria@example.com",
            "phone": "(21) 98888-8888",
            "average_bill": "500",
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        assert r.json().get("status") == "success"
