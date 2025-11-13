import { useState, useEffect } from "react";
import contactService from "@/services/api/contactService";
import { toast } from "react-toastify";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError("Failed to load contacts. Please try again.");
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData) => {
    try {
      const newContact = await contactService.create(contactData);
      setContacts(prev => [...prev, newContact].sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      }));
      toast.success("Contact created successfully!");
      return newContact;
    } catch (err) {
      toast.error("Failed to create contact. Please try again.");
      throw err;
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      const updatedContact = await contactService.update(id, contactData);
      setContacts(prev => prev.map(contact => 
        contact.Id === parseInt(id) ? updatedContact : contact
      ).sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      }));
      toast.success("Contact updated successfully!");
      return updatedContact;
    } catch (err) {
      toast.error("Failed to update contact. Please try again.");
      throw err;
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactService.delete(id);
      setContacts(prev => prev.filter(contact => contact.Id !== parseInt(id)));
      toast.success("Contact deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete contact. Please try again.");
      throw err;
    }
  };

  const toggleFavorite = async (contact) => {
    try {
      const updatedContact = await contactService.toggleFavorite(contact.Id);
      setContacts(prev => prev.map(c => 
        c.Id === contact.Id ? updatedContact : c
      ));
      toast.success(
        updatedContact.isFavorite 
          ? "Added to favorites!" 
          : "Removed from favorites!"
      );
    } catch (err) {
      toast.error("Failed to update favorite status.");
    }
  };

  const searchContacts = async (query) => {
    try {
      setLoading(true);
      setError("");
      const results = await contactService.search(query);
      setContacts(results);
    } catch (err) {
      setError("Failed to search contacts. Please try again.");
      console.error("Error searching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      setError("");
      const results = await contactService.getByCategory(category);
      setContacts(results);
    } catch (err) {
      setError("Failed to filter contacts. Please try again.");
      console.error("Error filtering contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    loadContacts,
    createContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    searchContacts,
    filterByCategory
  };
};