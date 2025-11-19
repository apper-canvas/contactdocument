import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperFileFieldComponent from "@/components/atoms/FileUploader";
import { format } from "date-fns";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ContactModal = ({ 
  contact, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete,
  onCall,
  onEmail,
  onToggleFavorite 
}) => {
  if (!contact) return null;

  const handleCall = () => {
if (contact.phone_c) {
      window.open(`tel:${contact.phone_c}`, "_self");
      onCall?.(contact);
    }
  };

  const handleEmail = () => {
if (contact.email_c) {
      window.open(`mailto:${contact.email_c}`, "_blank");
      onEmail?.(contact);
    }
  };

const initials = `${contact.firstName_c?.charAt(0) || ""}${contact.lastName_c?.charAt(0) || ""}`.toUpperCase();
  const fullName = `${contact.firstName_c || ""} ${contact.lastName_c || ""}`.trim();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-modal w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-secondary-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                    {initials || "?"}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900">
                      {fullName || "Unnamed Contact"}
                    </h2>
{contact.position_c && contact.company_c && (
                      <p className="text-sm text-secondary-600">
                        {contact.position_c} at {contact.company_c}
                      </p>
                    )}
                    {!contact.position_c && contact.company_c && (
                      <p className="text-sm text-secondary-600">
                        {contact.company_c}
                      </p>
                    )}
                    {contact.position_c && !contact.company_c && (
                      <p className="text-sm text-secondary-600">
                        {contact.position_c}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onToggleFavorite?.(contact)}
                    className={cn(
                      "p-2 rounded-full transition-all duration-150",
contact.isFavorite_c
                        ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                        : "text-secondary-300 hover:text-yellow-500 hover:bg-yellow-50"
                    )}
                  >
                    <ApperIcon 
                      name="Star" 
                      className={cn(
                        "w-5 h-5",
                        contact.isFavorite_c && "fill-current"
                      )}
                    />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-full transition-colors duration-150"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Category */}
{contact.category_c && (
                  <div>
                    <Badge variant={contact.category_c.toLowerCase()}>
                      {contact.category_c}
                    </Badge>
                  </div>
                )}

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-secondary-900">Contact Information</h3>
                  
{contact.phone_c && (
                    <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ApperIcon name="Phone" className="w-5 h-5 text-secondary-500" />
                        <span className="text-secondary-700">{contact.phone_c}</span>
                      </div>
                      <button
                        onClick={handleCall}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-150"
                      >
                        Call
                      </button>
                    </div>
                  )}

                  {contact.email_c && (
                    <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ApperIcon name="Mail" className="w-5 h-5 text-secondary-500" />
                        <span className="text-secondary-700">{contact.email_c}</span>
                      </div>
                      <button
                        onClick={handleEmail}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-150"
                      >
                        Email
                      </button>
                    </div>
                  )}

                  {contact.company_c && (
                    <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                      <ApperIcon name="Building" className="w-5 h-5 text-secondary-500" />
                      <span className="text-secondary-700">{contact.company_c}</span>
                    </div>
                  )}
                </div>

                {/* Notes */}
{contact.notes_c && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-secondary-900">Notes</h3>
                    <div className="p-4 bg-secondary-50 rounded-lg">
                      <p className="text-secondary-700 whitespace-pre-wrap">{contact.notes_c}</p>
                    </div>
                  </div>
)}

                {/* File Attachments */}
{contact.attachments_c && contact.attachments_c.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-secondary-900">File Attachments</h3>
                    <ApperFileFieldComponent
                      elementId={`contact-modal-attachments-${contact.Id}`}
                      config={{
                        fieldKey: `attachments_c_${contact.Id}_view`,
                        fieldName: "attachments_c",
                        tableName: "contact_c",
                        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
                        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
                        existingFiles: contact.attachments_c || [],
                        fileCount: (contact.attachments_c || []).length
                      }}
                    />
                  </div>
                )}

                {/* Metadata */}
                <div className="space-y-2 text-sm text-secondary-500">
{contact.CreatedOn && (
                    <p>Created: {format(new Date(contact.CreatedOn), "PPP")}</p>
                  )}
                  {contact.ModifiedOn && contact.ModifiedOn !== contact.CreatedOn && (
                    <p>Updated: {format(new Date(contact.ModifiedOn), "PPP")}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center p-6 border-t border-secondary-200 bg-secondary-50">
                <Button
                  variant="danger"
                  size="sm"
                  icon="Trash2"
                  onClick={() => onDelete?.(contact)}
                >
                  Delete
                </Button>
                <div className="flex space-x-3">
{contact.phone_c && (
                    <Button
                      onClick={handleCall}
                      size="sm"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <ApperIcon name="Phone" size={16} />
                    </Button>
                  )}

                  {contact.email_c && (
                    <Button
                      variant="secondary"
                      size="sm"
                      icon="Mail"
                      onClick={handleEmail}
                    >
                      Email
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="sm"
                    icon="Edit3"
                    onClick={() => onEdit?.(contact)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;