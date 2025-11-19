import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import contactService from "@/services/api/contactService";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await contactService.getAll();
      setContacts(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createContact = async (contactData) => {
    try {
      const newContact = await contactService.create(contactData);
      if (newContact) {
        await loadContacts(); // Reload to get fresh data
        toast.success("Contact created successfully!");
        return newContact;
      } else {
        throw new Error("Failed to create contact");
      }
    } catch (error) {
      console.error("Error creating contact:", error);
      toast.error("Failed to create contact");
      throw error;
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      const updatedContact = await contactService.update(id, contactData);
      if (updatedContact) {
        await loadContacts(); // Reload to get fresh data
        toast.success("Contact updated successfully!");
        return updatedContact;
      } else {
        throw new Error("Failed to update contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact");
      throw error;
    }
  };

  const deleteContact = async (id) => {
    try {
      const success = await contactService.delete(id);
      if (success) {
        await loadContacts(); // Reload to get fresh data
        toast.success("Contact deleted successfully!");
        return true;
      } else {
        throw new Error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
      throw error;
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const updatedContact = await contactService.toggleFavorite(id);
      if (updatedContact) {
        await loadContacts(); // Reload to get fresh data
        const isFav = updatedContact.isFavorite_c;
        toast.success(isFav ? "Added to favorites!" : "Removed from favorites!");
        return updatedContact;
      } else {
        throw new Error("Failed to toggle favorite");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorite status");
      throw error;
    }
  };

  const searchContacts = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await contactService.search(query);
      setContacts(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error searching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const data = await contactService.getByCategory(category);
      setContacts(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error filtering contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

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
    filterByCategory,
  };
};