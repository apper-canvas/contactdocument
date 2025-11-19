import { useState, useEffect, useRef, useMemo } from 'react';

const ApperFileFieldComponent = ({ elementId, config }) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  
  const mountedRef = useRef(false);
  const elementIdRef = useRef(elementId);
  const existingFilesRef = useRef(null);

  // Update elementId ref when it changes
  useEffect(() => {
    elementIdRef.current = `file-uploader-${elementId}`;
  }, [elementId]);

  // Memoize existingFiles to detect actual changes
  const memoizedExistingFiles = useMemo(() => {
    if (!config.existingFiles || !Array.isArray(config.existingFiles)) {
      return [];
    }
    
    // Check if files have changed by comparing length and first file's ID
    const currentFiles = config.existingFiles;
    const previousFiles = existingFilesRef.current;
    
    if (!previousFiles || 
        currentFiles.length !== previousFiles.length ||
        (currentFiles[0]?.Id !== previousFiles[0]?.Id && currentFiles[0]?.id !== previousFiles[0]?.id)) {
      return currentFiles;
    }
    
    return previousFiles;
  }, [config.existingFiles]);

  // Initial mount effect
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        let attempts = 0;
        const maxAttempts = 50;
        
        // Wait for ApperSDK to be available
        while (!window.ApperSDK && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        
        if (!window.ApperSDK) {
          throw new Error('ApperSDK not loaded after 5 seconds');
        }

        const { ApperFileUploader } = window.ApperSDK;
        
        if (mountedRef.current) {
          await ApperFileUploader.FileField.mount(elementIdRef.current, {
            ...config,
            existingFiles: memoizedExistingFiles
          });
          setIsReady(true);
          existingFilesRef.current = memoizedExistingFiles;
        }
      } catch (error) {
        console.error('Error mounting file field:', error);
        setError(error.message);
      }
    };

    mountedRef.current = true;
    initializeSDK();

    // Cleanup
    return () => {
      mountedRef.current = false;
      if (window.ApperSDK?.ApperFileUploader) {
        try {
          window.ApperSDK.ApperFileUploader.FileField.unmount(elementIdRef.current);
        } catch (error) {
          console.error('Error unmounting file field:', error);
        }
      }
      setIsReady(false);
      existingFilesRef.current = null;
    };
  }, [elementId, config.fieldKey]);

  // File update effect
  useEffect(() => {
    const updateFiles = async () => {
      if (!isReady || !window.ApperSDK || !config.fieldKey) return;
      
      try {
        // Check if files have actually changed
        const filesChanged = JSON.stringify(memoizedExistingFiles) !== JSON.stringify(existingFilesRef.current);
        if (!filesChanged) return;

        const { ApperFileUploader } = window.ApperSDK;
        
        // Check if format conversion is needed
        let filesToUpdate = memoizedExistingFiles;
        if (filesToUpdate.length > 0 && filesToUpdate[0].Id) {
          // Convert from API format to UI format
          filesToUpdate = ApperFileUploader.toUIFormat(filesToUpdate);
        }

        if (filesToUpdate.length > 0) {
          await ApperFileUploader.FileField.updateFiles(config.fieldKey, filesToUpdate);
        } else {
          await ApperFileUploader.FileField.clearField(config.fieldKey);
        }

        existingFilesRef.current = memoizedExistingFiles;
      } catch (error) {
        console.error('Error updating files:', error);
        setError(error.message);
      }
    };

    updateFiles();
  }, [memoizedExistingFiles, isReady, config.fieldKey]);

  if (error) {
    return (
      <div className="p-4 border border-red-300 rounded-lg bg-red-50">
        <p className="text-red-600 text-sm">Error loading file uploader: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!isReady && (
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-600 text-sm">Loading file uploader...</p>
        </div>
      )}
      <div id={elementIdRef.current} className="w-full" />
    </div>
  );
};

export default ApperFileFieldComponent;