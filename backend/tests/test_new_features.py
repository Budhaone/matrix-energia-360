import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://matrix-360-contact.preview.emergentagent.com').rstrip('/')

# Test contact form with new fields
class TestContactForm:
    def test_submit_contact_with_new_fields(self):
        payload = {
            "name": "TEST_User NewFields",
            "email": "test_newfields@example.com",
            "phone": "(61) 99999-9999",
            "average_bill": "450",
            "portability_expectations": "Quero manter minha distribuidora e receber créditos",
            "energy_pains": "Conta muito alta, aumentos constantes"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        data = r.json()
        assert data.get("status") == "success"
        print("PASS: Contact form with new fields submitted successfully")

    def test_submit_contact_without_optional_fields(self):
        payload = {
            "name": "TEST_User NoOptional",
            "email": "test_nooptional@example.com",
            "phone": "(61) 88888-8888",
            "average_bill": "300"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        print("PASS: Contact form without optional fields works")


class TestAdminEndpoints:
    def test_get_admin_leads(self):
        r = requests.get(f"{BASE_URL}/api/admin/leads")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}"
        data = r.json()
        assert isinstance(data, list)
        print(f"PASS: /api/admin/leads returned {len(data)} leads")

    def test_admin_leads_no_underscore_id(self):
        r = requests.get(f"{BASE_URL}/api/admin/leads")
        assert r.status_code == 200
        data = r.json()
        if data:
            assert "_id" not in data[0], "MongoDB _id should not be in response"
        print("PASS: No _id in admin leads response")

    def test_admin_leads_new_fields_persisted(self):
        # First submit a lead with new fields
        payload = {
            "name": "TEST_Verify Persistence",
            "email": "test_persist@example.com",
            "phone": "(61) 77777-7777",
            "average_bill": "600",
            "portability_expectations": "TEST portability expectation",
            "energy_pains": "TEST energy pain"
        }
        requests.post(f"{BASE_URL}/api/contact", json=payload)

        # Then check admin leads
        r = requests.get(f"{BASE_URL}/api/admin/leads")
        assert r.status_code == 200
        leads = r.json()
        found = next((l for l in leads if l.get("email") == "test_persist@example.com"), None)
        assert found is not None, "Lead not found in admin leads"
        assert found.get("portability_expectations") == "TEST portability expectation"
        assert found.get("energy_pains") == "TEST energy pain"
        print("PASS: New fields persisted and returned in admin leads")

    def test_get_admin_stats(self):
        r = requests.get(f"{BASE_URL}/api/admin/stats")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}"
        data = r.json()
        assert "total" in data
        assert "today" in data
        assert "this_week" in data
        assert isinstance(data["total"], int)
        assert data["total"] >= 0
        print(f"PASS: /api/admin/stats returned total={data['total']}, today={data['today']}, this_week={data['this_week']}")

    def test_admin_stats_counts_increase_after_submission(self):
        # Get initial stats
        r1 = requests.get(f"{BASE_URL}/api/admin/stats")
        initial = r1.json()

        # Submit a new lead
        requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Stats Check",
            "email": "test_stats_check@example.com",
            "phone": "(61) 66666-6666",
            "average_bill": "200"
        })

        # Get updated stats
        r2 = requests.get(f"{BASE_URL}/api/admin/stats")
        updated = r2.json()

        assert updated["total"] > initial["total"], "Total should increase after submission"
        assert updated["today"] >= initial["today"]
        print(f"PASS: Stats updated after submission: total {initial['total']} -> {updated['total']}")
