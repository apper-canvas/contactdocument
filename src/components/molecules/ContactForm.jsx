import React, { useState } from "react";
import ApperFileFieldComponent from "@/components/atoms/FileUploader";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";

const ContactForm = ({ 
  contact = null, 
  categories = [], 
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
const [formData, setFormData] = useState({
    firstName_c: contact?.firstName_c || "",
    lastName_c: contact?.lastName_c || "",
    email_c: contact?.email_c || "",
    phone_c: contact?.phone_c || "",
    company_c: contact?.company_c || "",
    position_c: contact?.position_c || "",
    category_c: contact?.category_c || "",
    notes_c: contact?.notes_c || "",
    isFavorite_c: contact?.isFavorite_c || false,
    attachments_c: contact?.attachments_c || [],
  });

  const [errors, setErrors] = useState({});

const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName_c.trim()) {
      newErrors.firstName_c = "First name is required";
    }

    if (!formData.lastName_c.trim()) {
      newErrors.lastName_c = "Last name is required";
    }

    if (!formData.email_c.trim()) {
      newErrors.email_c = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_c)) {
      newErrors.email_c = "Please enter a valid email address";
    }

    if (!formData.phone_c.trim()) {
      newErrors.phone_c = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

// File upload is handled by ApperFileFieldComponent
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
value={formData.firstName_c}
          onChange={(e) => handleChange("firstName_c", e.target.value)}
          error={errors.firstName_c}
          required
          disabled={loading}
          placeholder="Enter first name"
        />
        <Input
          label="Last Name"
          value={formData.lastName_c}
          onChange={(e) => handleChange("lastName_c", e.target.value)}
          error={errors.lastName_c}
          required
          disabled={loading}
          placeholder="Enter last name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email"
          type="email"
          value={formData.email_c}
          onChange={(e) => handleChange("email_c", e.target.value)}
          error={errors.email_c}
          required
          disabled={loading}
          placeholder="contact@example.com"
        />
        <Input
          label="Phone"
          type="tel"
          value={formData.phone_c}
          onChange={(e) => handleChange("phone_c", e.target.value)}
          error={errors.phone_c}
          required
          disabled={loading}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Company"
          value={formData.company_c}
          onChange={(e) => handleChange("company_c", e.target.value)}
          disabled={loading}
          placeholder="Company name"
        />
        <Input
          label="Position"
          value={formData.position_c}
          onChange={(e) => handleChange("position_c", e.target.value)}
          disabled={loading}
          placeholder="Job title"
        />
      </div>

      <Select
        label="Category"
        value={formData.category_c}
        onChange={(e) => handleChange("category_c", e.target.value)}
        disabled={loading}
      >
        <option value="">Select a category</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Development">Development</option>
        <option value="Support">Support</option>
        <option value="Other">Other</option>
      </Select>

<Textarea
        label="Notes"
        value={formData.notes_c}
        onChange={(e) => handleChange("notes_c", e.target.value)}
        disabled={loading}
        placeholder="Additional notes about this contact..."
        rows={3}
      />

      <div className="flex items-center">
        <input
id="favorite"
          type="checkbox"
          checked={formData.isFavorite_c}
          onChange={(e) => handleChange("isFavorite_c", e.target.checked)}
          disabled={loading}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
        />
        <label htmlFor="favorite" className="ml-2 text-sm text-secondary-700">
          Mark as favorite
        </label>
      </div>
{/* File Attachments */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-secondary-700">
          File Attachments
        </label>
        <ApperFileFieldComponent
          elementId={`contact-form-attachments-${contact?.Id || 'new'}`}
          config={{
            fieldKey: `attachments_c_${contact?.Id || 'new'}`,
            fieldName: "attachments_c",
            tableName: "contact_c",
            apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
            apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
            existingFiles: formData.attachments_c || [],
            fileCount: (formData.attachments_c || []).length
          }}
        />
      </div>
      <div className="flex justify-end space-x-4 pt-6 border-t border-secondary-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          icon="Save"
        >
          {contact ? "Update Contact" : "Create Contact"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;