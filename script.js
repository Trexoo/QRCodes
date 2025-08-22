// QRCore - Advanced QR Code SaaS Platform
// Enhanced functionality for multiple QR types and customization

let currentQRType = 'url';
let qrHistory = JSON.parse(localStorage.getItem('qrHistory') || '[]');

function decodeApiKey(encodedKey) {
    return atob(encodedKey);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateSizeDisplay();
});

function initializeEventListeners() {
    // QR Type selector buttons
    document.querySelectorAll('.qr-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectQRType(this.dataset.type);
        });
    });

    // Size slider
    const sizeSlider = document.getElementById('qr-size');
    if (sizeSlider) {
        sizeSlider.addEventListener('input', updateSizeDisplay);
    }
}

function selectQRType(type) {
    currentQRType = type;
    
    // Update active button
    document.querySelectorAll('.qr-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // Show corresponding form
    document.querySelectorAll('.input-section > div').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`${type}-form`).classList.add('active');
}

function updateSizeDisplay() {
    const sizeSlider = document.getElementById('qr-size');
    const sizeValue = document.getElementById('size-value');
    if (sizeSlider && sizeValue) {
        sizeValue.textContent = sizeSlider.value + 'px';
    }
}

function generateQRData() {
    let data = '';
    
    switch(currentQRType) {
        case 'url':
            data = document.getElementById('url-input').value;
            break;
            
        case 'text':
            data = document.getElementById('text-input').value;
            break;
            
        case 'email':
            const email = document.getElementById('email-to').value;
            const subject = document.getElementById('email-subject').value;
            const body = document.getElementById('email-body').value;
            data = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            break;
            
        case 'phone':
            data = `tel:${document.getElementById('phone-number').value}`;
            break;
            
        case 'sms':
            const smsNumber = document.getElementById('sms-number').value;
            const smsMessage = document.getElementById('sms-message').value;
            data = `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;
            break;
            
        case 'wifi':
            const ssid = document.getElementById('wifi-ssid').value;
            const password = document.getElementById('wifi-password').value;
            const security = document.getElementById('wifi-security').value;
            data = `WIFI:T:${security};S:${ssid};P:${password};;`;
            break;
            
        case 'vcard':
            const firstName = document.getElementById('vcard-firstname').value;
            const lastName = document.getElementById('vcard-lastname').value;
            const vcardEmail = document.getElementById('vcard-email').value;
            const vcardPhone = document.getElementById('vcard-phone').value;
            const organization = document.getElementById('vcard-organization').value;
            const website = document.getElementById('vcard-website').value;
            
            data = `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName}
EMAIL:${vcardEmail}
TEL:${vcardPhone}
ORG:${organization}
URL:${website}
END:VCARD`;
            break;
    }
    
    return data;
}

async function generateQRCode() {
    const data = generateQRData();
    
    if (!data || data.trim() === '') {
        showNotification('Please fill in the required fields', 'error');
        return;
    }

    const qrImage = document.getElementById('qrImage');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const downloadActions = document.getElementById('downloadActions');
    
    // Show loading
    loadingOverlay.classList.add('active');
    downloadActions.classList.add('hidden');
    
    // Get customization settings
    const size = document.getElementById('qr-size').value;
    const foregroundColor = document.getElementById('qr-color').value.replace('#', '');
    const backgroundColor = document.getElementById('bg-color').value.replace('#', '');
    const errorCorrection = document.getElementById('error-correction').value;
    
    const encodedApiKey = 'ZWM3MzM3NDNlNG1zaGI0NTYyMWQwZjk5ZTgyNnAxMDU0Y2Zqc24xZmMxODkxZWY1MDU=';

    try {
        // Build API URL with parameters
        const apiUrl = new URL('https://qr-code90.p.rapidapi.com/qr');
        apiUrl.searchParams.append('url', data);
        apiUrl.searchParams.append('size', size);
        apiUrl.searchParams.append('color', foregroundColor);
        apiUrl.searchParams.append('bgcolor', backgroundColor);
        apiUrl.searchParams.append('ecc', errorCorrection);
        
        const response = await fetch(apiUrl.toString(), {
            method: 'GET',
            headers: {
                'x-rapidapi-key': decodeApiKey(encodedApiKey),
                'x-rapidapi-host': 'qr-code90.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to generate QR code');
        }

        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        qrImage.src = objectURL;
        
        // Store current QR data for downloads
        window.currentQRData = {
            data: data,
            type: currentQRType,
            settings: {
                size: size,
                foregroundColor: foregroundColor,
                backgroundColor: backgroundColor,
                errorCorrection: errorCorrection
            },
            imageUrl: objectURL,
            timestamp: new Date().toISOString()
        };

        // Show download actions
        downloadActions.classList.remove('hidden');
        showNotification('QR code generated successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating QR code:', error);
        showNotification('Error generating QR code. Please try again.', 'error');
    } finally {
        loadingOverlay.classList.remove('active');
    }
}

function downloadQR(format) {
    if (!window.currentQRData) {
        showNotification('No QR code to download', 'error');
        return;
    }
    
    const qrImage = document.getElementById('qrImage');
    const link = document.createElement('a');
    
    switch(format) {
        case 'png':
            link.href = qrImage.src;
            link.download = `qrcode-${currentQRType}-${Date.now()}.png`;
            break;
            
        case 'svg':
            // For SVG, we'd need a different API endpoint or client-side generation
            showNotification('SVG export coming soon!', 'warning');
            return;
            
        case 'pdf':
            // For PDF, we'd need additional processing
            showNotification('PDF export coming soon!', 'warning');
            return;
    }
    
    link.click();
    showNotification(`Downloaded as ${format.toUpperCase()}`, 'success');
}

function saveToHistory() {
    if (!window.currentQRData) {
        showNotification('No QR code to save', 'error');
        return;
    }
    
    const historyItem = {
        id: Date.now(),
        ...window.currentQRData,
        name: `${currentQRType.toUpperCase()} QR Code`
    };
    
    qrHistory.unshift(historyItem);
    
    // Keep only last 50 items
    if (qrHistory.length > 50) {
        qrHistory = qrHistory.slice(0, 50);
    }
    
    localStorage.setItem('qrHistory', JSON.stringify(qrHistory));
    showNotification('QR code saved to history!', 'success');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Legacy function for backward compatibility
function generateCode() {
    generateQRCode();
}

function downloadQRCode() {
    downloadQR('png');
}
