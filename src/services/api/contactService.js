import contactsData from "@/services/mockData/contacts.json";

class ContactService {
  constructor() {
    this.contacts = [...contactsData];
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem("contactHub_contacts");
      if (stored) {
        this.contacts = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading contacts from storage:", error);
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem("contactHub_contacts", JSON.stringify(this.contacts));
    } catch (error) {
      console.error("Error saving contacts to storage:", error);
    }
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.contacts].sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const contact = this.contacts.find(contact => contact.Id === parseInt(id));
    return contact ? { ...contact } : null;
  }

  async create(contactData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const maxId = Math.max(...this.contacts.map(c => c.Id), 0);
const newContact = {
      ...contactData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachments: contactData.attachments || []
    };
    this.contacts.push(newContact);
    this.saveToStorage();
    return { ...newContact };
  }

  async update(id, contactData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = this.contacts.findIndex(contact => contact.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    
this.contacts[index] = {
      ...this.contacts[index],
      ...contactData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString(),
      attachments: contactData.attachments || this.contacts[index].attachments || []
    };
    
    this.saveToStorage();
    return { ...this.contacts[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.contacts.findIndex(contact => contact.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    
    const deletedContact = { ...this.contacts[index] };
    this.contacts.splice(index, 1);
    this.saveToStorage();
    return deletedContact;
  }

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) {
      return this.getAll();
    }
    
    const filtered = this.contacts.filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const email = contact.email.toLowerCase();
      const company = (contact.company || "").toLowerCase();
      const phone = contact.phone.replace(/\D/g, "");
      const searchPhone = searchTerm.replace(/\D/g, "");
      
      return fullName.includes(searchTerm) ||
             email.includes(searchTerm) ||
             company.includes(searchTerm) ||
             (searchPhone && phone.includes(searchPhone));
    });
    
    return filtered.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    if (!category || category === "all") {
      return this.getAll();
    }
    
    const filtered = this.contacts.filter(contact => 
      contact.category && contact.category.toLowerCase() === category.toLowerCase()
    );
    
    return filtered.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  async getFavorites() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const favorites = this.contacts.filter(contact => contact.isFavorite);
    return favorites.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  async toggleFavorite(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.contacts.findIndex(contact => contact.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    
    this.contacts[index].isFavorite = !this.contacts[index].isFavorite;
    this.contacts[index].updatedAt = new Date().toISOString();
    
    this.saveToStorage();
    return { ...this.contacts[index] };
  }

  async getStats() {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const total = this.contacts.length;
    const favorites = this.contacts.filter(c => c.isFavorite).length;
    const byCategory = {};
    
    this.contacts.forEach(contact => {
      const category = contact.category || "Uncategorized";
      byCategory[category] = (byCategory[category] || 0) + 1;
    });
    
    return {
      total,
      favorites,
      byCategory
    };
  }
}

const contactService = new ContactService();
export default contactService;