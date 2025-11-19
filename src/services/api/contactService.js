import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class ContactService {
  constructor() {
    this.tableName = 'contact_c';
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "firstName_c"}},
          {"field": {"Name": "lastName_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "position_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "isFavorite_c"}},
          {"field": {"Name": "attachments_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "firstName_c", "sorttype": "ASC"}]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching contacts:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "firstName_c"}},
          {"field": {"Name": "lastName_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "position_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "isFavorite_c"}},
          {"field": {"Name": "attachments_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(contactData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      // Filter out non-updateable fields and map to database field names
      const record = {
        Name: `${contactData.firstName_c || ''} ${contactData.lastName_c || ''}`.trim(),
        firstName_c: contactData.firstName_c || '',
        lastName_c: contactData.lastName_c || '',
        email_c: contactData.email_c || '',
        phone_c: contactData.phone_c || '',
        company_c: contactData.company_c || '',
        position_c: contactData.position_c || '',
        category_c: contactData.category_c || '',
        notes_c: contactData.notes_c || '',
        isFavorite_c: contactData.isFavorite_c || false
      };

      // Only include non-empty values
      const filteredRecord = {};
      Object.keys(record).forEach(key => {
        if (record[key] !== '' && record[key] !== null && record[key] !== undefined) {
          filteredRecord[key] = record[key];
        }
      });

      const params = {
        records: [filteredRecord]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error creating contact:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, contactData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      // Filter out non-updateable fields and map to database field names
      const record = {
        Id: parseInt(id),
        Name: `${contactData.firstName_c || ''} ${contactData.lastName_c || ''}`.trim(),
        firstName_c: contactData.firstName_c,
        lastName_c: contactData.lastName_c,
        email_c: contactData.email_c,
        phone_c: contactData.phone_c,
        company_c: contactData.company_c,
        position_c: contactData.position_c,
        category_c: contactData.category_c,
        notes_c: contactData.notes_c,
        isFavorite_c: contactData.isFavorite_c
      };

      // Only include non-empty values (excluding ID)
      const filteredRecord = { Id: parseInt(id) };
      Object.keys(record).forEach(key => {
        if (key !== 'Id' && record[key] !== '' && record[key] !== null && record[key] !== undefined) {
          filteredRecord[key] = record[key];
        }
      });

      const params = {
        records: [filteredRecord]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error updating contact:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length === 1;
      }
    } catch (error) {
      console.error("Error deleting contact:", error?.response?.data?.message || error);
      return false;
    }
  }

  async search(query) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      if (!query || !query.trim()) {
        return this.getAll();
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "firstName_c"}},
          {"field": {"Name": "lastName_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "position_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "isFavorite_c"}},
          {"field": {"Name": "attachments_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "firstName_c", "operator": "Contains", "values": [query.trim()]},
                {"fieldName": "lastName_c", "operator": "Contains", "values": [query.trim()]},
                {"fieldName": "email_c", "operator": "Contains", "values": [query.trim()]},
                {"fieldName": "company_c", "operator": "Contains", "values": [query.trim()]},
                {"fieldName": "phone_c", "operator": "Contains", "values": [query.trim()]}
              ],
              "operator": "OR"
            }
          ]
        }],
        orderBy: [{"fieldName": "firstName_c", "sorttype": "ASC"}]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching contacts:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getByCategory(category) {
    try {
      if (!category || category === "all") {
        return this.getAll();
      }

      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "firstName_c"}},
          {"field": {"Name": "lastName_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "position_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "isFavorite_c"}},
          {"field": {"Name": "attachments_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        where: [{
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [category],
          "Include": true
        }],
        orderBy: [{"fieldName": "firstName_c", "sorttype": "ASC"}]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching contacts by category:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getFavorites() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "firstName_c"}},
          {"field": {"Name": "lastName_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "position_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "isFavorite_c"}},
          {"field": {"Name": "attachments_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        where: [{
          "FieldName": "isFavorite_c",
          "Operator": "EqualTo",
          "Values": [true],
          "Include": true
        }],
        orderBy: [{"fieldName": "firstName_c", "sorttype": "ASC"}]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching favorite contacts:", error?.response?.data?.message || error);
      return [];
    }
  }

  async toggleFavorite(id) {
    try {
      // First get the current contact
      const contact = await this.getById(id);
      if (!contact) {
        throw new Error("Contact not found");
      }

      // Toggle the favorite status
      const updatedData = {
        isFavorite_c: !contact.isFavorite_c
      };

      return await this.update(id, updatedData);
    } catch (error) {
      console.error("Error toggling favorite:", error?.response?.data?.message || error);
      return null;
    }
  }

  async getStats() {
    try {
      const contacts = await this.getAll();
      
      const total = contacts.length;
      const favorites = contacts.filter(c => c.isFavorite_c).length;
      const byCategory = {};

      contacts.forEach(contact => {
        const category = contact.category_c || "Uncategorized";
        byCategory[category] = (byCategory[category] || 0) + 1;
      });

      return {
        total,
        favorites,
        byCategory
      };
    } catch (error) {
      console.error("Error fetching stats:", error?.response?.data?.message || error);
      return {
        total: 0,
        favorites: 0,
        byCategory: {}
      };
    }
  }
}

const contactService = new ContactService();
export default contactService;