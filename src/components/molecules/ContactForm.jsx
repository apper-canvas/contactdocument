import React, { useState } from "react";
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
    firstName: contact?.firstName || "",
    lastName: contact?.lastName || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    company: contact?.company || "",
    position: contact?.position || "",
    category: contact?.category || "",
    notes: contact?.notes || "",
    isFavorite: contact?.isFavorite || false,
    attachments: contact?.attachments || [],
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
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

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newFiles]
    }));
  };

  const handleFileRemove = (fileId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(file => file.id !== fileId)
    }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          error={errors.firstName}
          required
          disabled={loading}
          placeholder="Enter first name"
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          error={errors.lastName}
          required
          disabled={loading}
          placeholder="Enter last name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          required
          disabled={loading}
          placeholder="contact@example.com"
        />
        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          error={errors.phone}
          required
          disabled={loading}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Company"
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          disabled={loading}
          placeholder="Company name"
        />
        <Input
          label="Position"
          value={formData.position}
          onChange={(e) => handleChange("position", e.target.value)}
          disabled={loading}
          placeholder="Job title"
        />
      </div>

      <Select
        label="Category"
        value={formData.category}
        onChange={(e) => handleChange("category", e.target.value)}
        disabled={loading}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.Id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Select>

      <Textarea
        label="Notes"
        value={formData.notes}
        onChange={(e) => handleChange("notes", e.target.value)}
        disabled={loading}
        placeholder="Additional notes about this contact..."
        rows={3}
      />

      <div className="flex items-center">
        <input
          id="favorite"
          type="checkbox"
          checked={formData.isFavorite}
          onChange={(e) => handleChange("isFavorite", e.target.checked)}
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
        
        {/* File Upload Area */}
        <div
          onDrop={handleFileDrop}
          onDragOver={handleFileDragOver}
          className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors"
        >
          <ApperIcon name="Upload" size={24} className="mx-auto text-secondary-400 mb-2" />
          <p className="text-sm text-secondary-600 mb-2">
            Drag & drop files here, or{" "}
            <label className="text-primary-600 hover:text-primary-700 cursor-pointer font-medium">
              browse
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
              />
            </label>
          </p>
          <p className="text-xs text-secondary-500">
            PDF, Word docs, images, archives (max 10MB each)
          </p>
        </div>

        {/* Attached Files List */}
        {formData.attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            <h4 className="text-sm font-medium text-secondary-700">Attached Files</h4>
            {formData.attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon 
                    name={file.type.includes('image') ? 'Image' : 
                          file.type.includes('pdf') ? 'FileText' : 
                          file.type.includes('doc') ? 'FileText' : 'File'} 
                    size={16} 
                    className="text-secondary-500" 
                  />
                  <div>
                    <p className="text-sm font-medium text-secondary-900 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-secondary-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFileRemove(file.id)}
                  disabled={loading}
                  className="text-secondary-500 hover:text-red-600"
                >
                  <ApperIcon name="X" size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
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