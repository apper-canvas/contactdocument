import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import ContactList from "@/components/organisms/ContactList";
import ContactModal from "@/components/organisms/ContactModal";
import ContactFormModal from "@/components/organisms/ContactFormModal";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";
import { useContacts } from "@/hooks/useContacts";
import { useCategories } from "@/hooks/useCategories";

const Home = () => {
  const {
    contacts,
    loading: contactsLoading,
    error: contactsError,
    loadContacts,
    createContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    searchContacts,
    filterByCategory
  } = useContacts();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useCategories();

  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort contacts
  const filteredContacts = useMemo(() => {
    let filtered = [...contacts];

    // Filter by favorites if enabled
    if (showFavoritesOnly) {
      filtered = filtered.filter(contact => contact.isFavorite);
    }

    // Sort contacts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB);
        case "company":
          return (a.company || "").localeCompare(b.company || "");
        case "recent":
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [contacts, showFavoritesOnly, sortBy]);

  // Handle search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchContacts(searchQuery);
      } else if (selectedCategory !== "all") {
        filterByCategory(selectedCategory);
      } else {
        loadContacts();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    filterByCategory(category);
  };

  // Contact actions
  const handleContactView = (contact) => {
    setSelectedContact(contact);
    setIsContactModalOpen(true);
  };

  const handleContactEdit = (contact) => {
    setEditingContact(contact);
    setIsFormModalOpen(true);
    setIsContactModalOpen(false);
  };

  const handleContactCall = (contact) => {
    toast.info(`Calling ${contact.firstName} ${contact.lastName}...`);
  };

  const handleContactEmail = (contact) => {
    toast.info(`Opening email to ${contact.firstName} ${contact.lastName}...`);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);
      if (editingContact) {
        await updateContact(editingContact.Id, formData);
      } else {
        await createContact(formData);
      }
      setIsFormModalOpen(false);
      setEditingContact(null);
    } catch (error) {
      console.error("Error saving contact:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteContact = async (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
      try {
        await deleteContact(contact.Id);
        setIsContactModalOpen(false);
        setSelectedContact(null);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  // Loading state
  if (contactsLoading || categoriesLoading) {
    return <Loading message="Loading your contacts..." />;
  }

  // Error state
  if (contactsError || categoriesError) {
    return (
      <ErrorView
        title="Unable to load contacts"
        message={contactsError || categoriesError}
        onRetry={loadContacts}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Contact Hub
        </motion.h1>
        <motion.p
          className="text-lg text-secondary-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Organize, manage, and connect with your professional network efficiently
        </motion.p>
      </div>

      {/* Search and Controls */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by name, email, company, or phone..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <Button
            onClick={handleAddContact}
            icon="Plus"
            size="lg"
            className="lg:w-auto"
          >
            Add Contact
          </Button>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-secondary-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                showFavoritesOnly
                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50"
              }`}
            >
              <ApperIcon 
                name="Star" 
                className={`w-4 h-4 ${showFavoritesOnly ? "fill-current" : ""}`} 
              />
              Favorites Only
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="name">Sort by Name</option>
              <option value="company">Sort by Company</option>
              <option value="recent">Recently Updated</option>
            </select>
          </div>

          <div className="text-sm text-secondary-600">
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </motion.div>

      {/* Contact List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {filteredContacts.length > 0 ? (
            <ContactList
              contacts={filteredContacts}
              onContactView={handleContactView}
              onContactEdit={handleContactEdit}
              onContactCall={handleContactCall}
              onContactEmail={handleContactEmail}
              onContactToggleFavorite={toggleFavorite}
            />
          ) : (
            <Empty
              title={searchQuery || selectedCategory !== "all" ? "No matching contacts" : "No contacts yet"}
              message={
                searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filter to find contacts."
                  : "Get started by adding your first contact to build your professional network."
              }
              actionLabel="Add Your First Contact"
              onAction={handleAddContact}
              icon={searchQuery || selectedCategory !== "all" ? "Search" : "Users"}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Contact Detail Modal */}
      <ContactModal
        contact={selectedContact}
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          setSelectedContact(null);
        }}
        onEdit={handleContactEdit}
        onDelete={handleDeleteContact}
        onCall={handleContactCall}
        onEmail={handleContactEmail}
        onToggleFavorite={toggleFavorite}
      />

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isFormModalOpen}
        contact={editingContact}
        categories={categories}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingContact(null);
        }}
        onSubmit={handleFormSubmit}
        loading={formLoading}
      />
    </div>
  );
};

export default Home;