document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas
    const particlesContainer = document.getElementById('particles-js');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Tamaño aleatorio entre 2px y 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posición inicial aleatoria
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `-10px`;
      
      // Opacidad aleatoria
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      // Duración de animación aleatoria
      const duration = Math.random() * 15 + 10;
      particle.style.animationDuration = `${duration}s`;
      
      // Retraso inicial aleatorio
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
    }
    
    // Efecto de iluminación en los inputs
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.style.boxShadow = `0 0 0 3px rgba(255, 107, 53, 0.3)`;
        this.style.borderColor = 'rgba(255, 255, 255, 0.6)';
      });
      
      input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      });
    });
    
    // Actualizar nombre del archivo al seleccionarlo
    const fileInput = document.querySelector('.file-upload-input');
    const fileNameDisplay = document.querySelector('.file-upload-name');
    
    if (fileInput) {
      fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
          fileNameDisplay.textContent = this.files[0].name;
          
          // Mostrar previsualización de imagen
          const reader = new FileReader();
          const profilePicture = document.querySelector('.profile-picture');
          const placeholder = document.querySelector('.profile-picture-placeholder');
          
          reader.onload = function(e) {
            if (placeholder) {
              placeholder.style.display = 'none';
            }
            
            if (!profilePicture) {
              const newImg = document.createElement('img');
              newImg.src = e.target.result;
              newImg.alt = 'Foto de Perfil';
              newImg.className = 'profile-picture';
              document.querySelector('.profile-picture-container').prepend(newImg);
            } else {
              profilePicture.src = e.target.result;
            }
          }
          
          reader.readAsDataURL(this.files[0]);
        }
      });
    }
    
    // Efecto de botón guardar mejorado
    const saveButton = document.querySelector('.btn-save');
    if (saveButton) {
      saveButton.addEventListener('click', function(e) {
        // Solo si no está ya en estado de loading
        if (!this.classList.contains('loading')) {
          // Cambiar a estado de loading
          this.classList.add('loading');
          const originalText = this.innerHTML;
          this.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i> Guardando...
          `;
          
          // Simular tiempo de guardado (2 segundos)
          setTimeout(() => {
            // Cambiar a estado de éxito
            this.classList.remove('loading');
            this.classList.add('success');
            this.innerHTML = `
              <i class="fas fa-check"></i> Guardado
            `;
            
            // Volver al estado normal después de 1.5 segundos
            setTimeout(() => {
              this.classList.remove('success');
              this.innerHTML = originalText;
            }, 1500);
          }, 2000);
        }
      });
    }
  });