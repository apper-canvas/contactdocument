import { motion, AnimatePresence } from "framer-motion";
import ContactCard from "@/components/molecules/ContactCard";

const ContactList = ({ 
  contacts = [], 
  onContactView, 
  onContactEdit, 
  onContactCall, 
  onContactEmail,
  onContactToggleFavorite 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {contacts.map((contact, index) => (
          <ContactCard
            key={contact.Id}
            contact={contact}
            onView={onContactView}
            onEdit={onContactEdit}
            onCall={onContactCall}
            onEmail={onContactEmail}
            onToggleFavorite={onContactToggleFavorite}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ContactList;