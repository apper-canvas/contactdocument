import { useState, useEffect, useCallback } from "react";
import categoryService from "@/services/api/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getAll();
      // Transform data to match expected format
      const transformedData = (data || []).map(cat => ({
        Id: cat.Id,
        name: cat.Name,
        color: cat.color_c,
        icon: cat.icon_c
      }));
      setCategories(transformedData);
    } catch (err) {
      setError(err.message);
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    loadCategories,
  };
};