// Утилиты для работы с изображениями

/**
 * Создает превью изображения с заданными параметрами
 * @param {File} file - Файл изображения
 * @param {number} maxWidth - Максимальная ширина превью
 * @param {number} maxHeight - Максимальная высота превью
 * @param {number} quality - Качество сжатия (0-1)
 * @returns {Promise<string>} - Base64 строка превью
 */
export const createImagePreview = (file, maxWidth = 400, maxHeight = 400, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Invalid file type'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Вычисляем новые размеры с сохранением пропорций
      let { width, height } = img;
      const aspectRatio = width / height;

      if (width > height) {
        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }
      } else {
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }
      }

      // Устанавливаем размер canvas
      canvas.width = width;
      canvas.height = height;

      // Рисуем изображение с новыми размерами
      ctx.drawImage(img, 0, 0, width, height);

      // Конвертируем в base64
      const preview = canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Создает превью для видео файла
 * @param {File} file - Видео файл
 * @param {number} timeOffset - Время в секундах для создания скриншота
 * @returns {Promise<string>} - Base64 строка превью
 */
export const createVideoPreview = (file, timeOffset = 1) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('video/')) {
      reject(new Error('Invalid file type'));
      return;
    }

    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(timeOffset, video.duration);
    };

    video.onseeked = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        },
        'image/jpeg',
        0.8
      );
    };

    video.onerror = reject;
    video.src = URL.createObjectURL(file);
  });
};

/**
 * Создает превью изображения для галереи (соотношение 4:5)
 * @param {File} file - Файл изображения
 * @returns {Promise<string>} - Base64 строка превью
 */
export const createGalleryPreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Invalid file type'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Размеры для галереи (4:5 соотношение)
      const targetWidth = 320;
      const targetHeight = 400;
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Определяем область для обрезки (crop)
      const sourceAspectRatio = img.width / img.height;
      const targetAspectRatio = targetWidth / targetHeight;

      let sourceWidth, sourceHeight, sourceX, sourceY;

      if (sourceAspectRatio > targetAspectRatio) {
        // Изображение шире, обрезаем по ширине
        sourceHeight = img.height;
        sourceWidth = img.height * targetAspectRatio;
        sourceX = (img.width - sourceWidth) / 2;
        sourceY = 0;
      } else {
        // Изображение выше, обрезаем по высоте
        sourceWidth = img.width;
        sourceHeight = img.width / targetAspectRatio;
        sourceX = 0;
        sourceY = (img.height - sourceHeight) / 2;
      }

      // Рисуем обрезанное изображение
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, targetWidth, targetHeight
      );

      // Конвертируем в base64
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        },
        'image/jpeg',
        0.85
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Создает превью видео для галереи (соотношение 16:9)
 * @param {File} file - Видео файл
 * @param {number} timeOffset - Время в секундах для создания скриншота
 * @returns {Promise<string>} - Base64 строка превью
 */
export const createVideoGalleryPreview = (file, timeOffset = 1) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('video/')) {
      reject(new Error('Invalid file type'));
      return;
    }

    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(timeOffset, video.duration);
    };

    video.onseeked = () => {
      // Размеры для видео галереи (16:9 соотношение)
      const targetWidth = 320;
      const targetHeight = 180;
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Определяем область для обрезки
      const sourceAspectRatio = video.videoWidth / video.videoHeight;
      const targetAspectRatio = targetWidth / targetHeight;

      let sourceWidth, sourceHeight, sourceX, sourceY;

      if (sourceAspectRatio > targetAspectRatio) {
        // Видео шире, обрезаем по ширине
        sourceHeight = video.videoHeight;
        sourceWidth = video.videoHeight * targetAspectRatio;
        sourceX = (video.videoWidth - sourceWidth) / 2;
        sourceY = 0;
      } else {
        // Видео выше, обрезаем по высоте
        sourceWidth = video.videoWidth;
        sourceHeight = video.videoWidth / targetAspectRatio;
        sourceX = 0;
        sourceY = (video.videoHeight - sourceHeight) / 2;
      }

      // Рисуем обрезанное видео
      ctx.drawImage(
        video,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, targetWidth, targetHeight
      );
      
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        },
        'image/jpeg',
        0.85
      );
    };

    video.onerror = reject;
    video.src = URL.createObjectURL(file);
  });
};

/**
 * Валидация файла изображения
 * @param {File} file - Файл для проверки
 * @param {number} maxSizeBytes - Максимальный размер в байтах
 * @returns {Object} - Результат валидации
 */
export const validateImageFile = (file, maxSizeBytes = 10 * 1024 * 1024) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' };
  }

  if (file.size > maxSizeBytes) {
    const maxSizeMB = maxSizeBytes / (1024 * 1024);
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit.` };
  }

  return { valid: true, error: null };
};

/**
 * Валидация видео файла
 * @param {File} file - Файл для проверки
 * @param {number} maxSizeBytes - Максимальный размер в байтах
 * @returns {Object} - Результат валидации
 */
export const validateVideoFile = (file, maxSizeBytes = 100 * 1024 * 1024) => {
  const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm'];
  
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only MP4, MOV, AVI, and WebM are allowed.' };
  }

  if (file.size > maxSizeBytes) {
    const maxSizeMB = maxSizeBytes / (1024 * 1024);
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit.` };
  }

  return { valid: true, error: null };
};