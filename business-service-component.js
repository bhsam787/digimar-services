/**
 * Custom element that manages a dynamic business services form
 * Allows users to select business services and add business contacts for each service
 * Provides validation, data collection, and submission functionality
 */
class BusinessServiceForm extends HTMLElement {
  constructor() {
    super();

    // Internal data store for collected business information
    this.__businessData = [];

    // SVG icons used throughout the component
    this.icons = {
      remove: this.createRemoveIcon(),
      saved: this.createSavedIcon(),
      plus: this.createPlusIcon(),
      cross: this.createCrossIcon(),
    };

    // Initialize the component
    this.init();
  }

  /**
   * Creates SVG icon for remove button
   * @returns {string} SVG markup
   */
  createRemoveIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13.9987 2.66667H11.932C11.7773 1.91428 11.3679 1.23823 10.7729 0.752479C10.1778 0.266727 9.4335 0.000969683 8.66537 0L7.33203 0C6.5639 0.000969683 5.81958 0.266727 5.22453 0.752479C4.62949 1.23823 4.2201 1.91428 4.06537 2.66667H1.9987C1.82189 2.66667 1.65232 2.7369 1.52729 2.86193C1.40227 2.98695 1.33203 3.15652 1.33203 3.33333C1.33203 3.51014 1.40227 3.67971 1.52729 3.80474C1.65232 3.92976 1.82189 4 1.9987 4H2.66536V12.6667C2.66642 13.5504 3.01795 14.3976 3.64284 15.0225C4.26774 15.6474 5.11497 15.9989 5.9987 16H9.9987C10.8824 15.9989 11.7297 15.6474 12.3546 15.0225C12.9794 14.3976 13.331 13.5504 13.332 12.6667V4H13.9987C14.1755 4 14.3451 3.92976 14.4701 3.80474C14.5951 3.67971 14.6654 3.51014 14.6654 3.33333C14.6654 3.15652 14.5951 2.98695 14.4701 2.86193C14.3451 2.7369 14.1755 2.66667 13.9987 2.66667ZM7.33203 1.33333H8.66537C9.07888 1.33384 9.48212 1.46225 9.81978 1.70096C10.1574 1.93967 10.413 2.27699 10.5514 2.66667H5.44603C5.58442 2.27699 5.83997 1.93967 6.17762 1.70096C6.51528 1.46225 6.91852 1.33384 7.33203 1.33333ZM11.9987 12.6667C11.9987 13.1971 11.788 13.7058 11.4129 14.0809C11.0378 14.456 10.5291 14.6667 9.9987 14.6667H5.9987C5.46827 14.6667 4.95956 14.456 4.58449 14.0809C4.20941 13.7058 3.9987 13.1971 3.9987 12.6667V4H11.9987V12.6667Z" fill="#A1A5B7"/>
      <path d="M6.66667 12C6.84348 12 7.01305 11.9298 7.13807 11.8048C7.2631 11.6797 7.33333 11.5102 7.33333 11.3334V7.33335C7.33333 7.15654 7.2631 6.98697 7.13807 6.86195C7.01305 6.73693 6.84348 6.66669 6.66667 6.66669C6.48986 6.66669 6.32029 6.73693 6.19526 6.86195C6.07024 6.98697 6 7.15654 6 7.33335V11.3334C6 11.5102 6.07024 11.6797 6.19526 11.8048C6.32029 11.9298 6.48986 12 6.66667 12Z" fill="#A1A5B7"/>
      <path d="M9.33464 12C9.51145 12 9.68102 11.9297 9.80604 11.8047C9.93106 11.6797 10.0013 11.5101 10.0013 11.3333V7.33329C10.0013 7.15648 9.93106 6.98691 9.80604 6.86189C9.68102 6.73686 9.51145 6.66663 9.33464 6.66663C9.15782 6.66663 8.98826 6.73686 8.86323 6.86189C8.73821 6.98691 8.66797 7.15648 8.66797 7.33329V11.3333C8.66797 11.5101 8.73821 11.6797 8.86323 11.8047C8.98826 11.9297 9.15782 12 9.33464 12Z" fill="#A1A5B7"/>
    </svg>`;
  }

  /**
   * Creates SVG icon for saved state
   * @returns {string} SVG markup
   */
  createSavedIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4444 0.719667C13.7373 1.01256 13.7373 1.48743 13.4444 1.78033L5.94439 9.28032C5.65151 9.5732 5.17663 9.5732 4.88373 9.28032L1.13373 5.53032C0.84084 5.23745 0.84084 4.76255 1.13373 4.46967C1.42663 4.1768 1.9015 4.1768 2.19439 4.46967L5.41406 7.68935L12.3837 0.719667C12.6766 0.426778 13.1515 0.426778 13.4444 0.719667Z" fill="#FF6600"/>
    </svg>`;
  }

  /**
   * Creates SVG icon for add/plus button
   * @returns {string} SVG markup
   */
  createPlusIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
      <path d="M14.1554 6.3H8.55551V0.699957C8.55551 0.313641 8.24187 0 7.85542 0C7.46911 0 7.15547 0.313641 7.15547 0.699957V6.3H1.55543C1.16911 6.3 0.855469 6.61364 0.855469 6.99996C0.855469 7.3864 1.16911 7.70004 1.55543 7.70004H7.15547V13.3C7.15547 13.6864 7.46911 14 7.85542 14C8.24187 14 8.55551 13.6864 8.55551 13.3V7.70004H14.1554C14.5419 7.70004 14.8555 7.3864 14.8555 6.99996C14.8555 6.61364 14.5419 6.3 14.1554 6.3Z" fill="#FF6600"/>
    </svg>`;
  }

  /**
   * Creates SVG icon for cross/close button
   * @returns {string} SVG markup
   */
  createCrossIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  }

  /**
   * Renders a new business form inside the specified container
   * Creates input fields for business information and attaches validation listeners
   * @param {HTMLElement} container - DOM element to append the form to
   */
  addBusinessForm(container) {
    const formHtml = `
      <div class="business-card">
        <div class="remove-btn">
          <span class="remove-btn-icon">${this.icons.remove}</span>
          <span class="remove-btn-text">Remove</span>
        </div>
        <div class="input-wrapper">
          <div class="form-field">
            <input type="text" id="businessName" placeholder="Business name*" />
            <div class="error-message"></div>
          </div>
          <div class="form-field">
            <input type="text" id="contactName" placeholder="Contact name*" />
            <div class="error-message"></div>
          </div>
          <div class="form-field">
            <input type="tel" id="contactPhone" placeholder="Phone number*" />
            <div class="error-message"></div>
          </div>
          <div class="form-field">
            <input type="email" id="contactEmail" placeholder="Email*" />
            <div class="error-message"></div>
          </div>
        </div>
        <div class="business-card-btn-wrapper">
          <button class="save-btn" disabled>
            <span class="save-btn-icon">${this.icons.saved}</span>
            <span class="save-btn-text">SAVE</span>
          </button>
          <button class="add-business-entry-btn" disabled>
            <span class="add-business-entry-icon">${this.icons.plus}</span>
            <span class="add-business-entry-text">ADD ANOTHER BUSINESS</span>
          </button>
        </div>
      </div>
    `;

    // Insert form into container
    container.insertAdjacentHTML('beforeend', formHtml);

    // Add validation listeners to all input fields
    const latestInputs = container.lastElementChild.querySelectorAll('input');
    latestInputs.forEach((input) => {
      input.addEventListener('input', () => this.validateForm(input));
    });
  }

  /**
   * Attaches change event listeners to service card checkboxes
   * Toggles active state based on checkbox selection
   */
  attachCheckBoxInputListener() {
    this.querySelectorAll('.service-card').forEach((card) => {
      const checkbox = card.querySelector('.service-card__checkbox');
      checkbox.addEventListener('change', () => {
        card.classList.toggle('active', checkbox.checked);
      });
    });
  }

  /**
   * Adds a new business entry form to a service card
   * @param {HTMLElement} clickedItem - The element that was clicked to add a business
   */
  addBusiness(clickedItem) {
    const card = clickedItem.closest('.service-card');
    const container = card.querySelector('.form-container');
    this.addBusinessForm(container);
  }

  /**
   * Removes a business card from the DOM
   * @param {HTMLElement} clickedItem - The element that was clicked to remove a business
   */
  removeBusiness(clickedItem) {
    clickedItem.closest('.business-card').remove();
  }

  /**
   * Collects and stores data from a saved business card
   * Prevents duplicate entries for the same business
   * @param {HTMLElement} wrapper - The service card wrapper
   * @param {HTMLElement} businessCard - The business card being saved
   * @returns {Array} Updated collection of business data
   */
  storeInformation(wrapper, businessCard) {
    const { id } = wrapper.dataset;
    const inputs = businessCard.querySelectorAll('input');
    const data = {};

    // Extract input values
    inputs.forEach((input) => {
      data[input.id] = input.value.trim();
    });

    const businessId = Number(id);

    // Check for duplicates before adding
    const isDuplicate = this.__businessData.some((item) => {
      if (item.businessId !== businessId) return false;
      return Object.keys(data).every((key) => item[key] === data[key]);
    });

    // Add data if not a duplicate
    if (!isDuplicate) {
      this.__businessData.push({
        businessId,
        ...data,
      });
    }

    return this.__businessData;
  }

  /**
   * Removes business information from stored data when a card is removed
   * @param {HTMLElement} wrapper - The service card wrapper
   * @param {HTMLElement} businessCard - The business card being removed
   * @returns {Array} Updated collection of business data
   */
  removeInformation(wrapper, businessCard) {
    const { id } = wrapper.dataset;
    const inputs = businessCard.querySelectorAll('input');
    const currentData = {
      businessId: Number(id),
    };

    // Extract input values
    inputs.forEach((input) => {
      currentData[input.id] = input.value.trim();
    });

    // Filter out the matching entry
    this.__businessData = this.__businessData.filter((item) => {
      return Object.keys(currentData).some((key) => item[key] !== currentData[key]);
    });

    return this.__businessData;
  }

  /**
   * Resets the DOM to its initial state after modal close
   * - Clears all stored business data
   * - Removes all active/selected states from service cards
   * - Removes the submit button wrapper
   * - Removes all business cards
   * - Unchecks all checkboxes
   */
  resetDom() {
    // Clear stored data
    this.__businessData = [];

    // Query elements once for better performance
    const elements = {
      serviceCards: this.querySelectorAll('.service-card'),
      submitWrapper: this.querySelector('.submit-wrapper'),
      checkboxes: this.querySelectorAll('input[type="checkbox"]'),
      businessCards: this.querySelectorAll('.business-card'),
    };

    // Reset service cards
    elements.serviceCards.forEach((card) => {
      card.classList.remove('business-option-added', 'active');
    });

    // Remove submit wrapper if it exists
    if (elements.submitWrapper) elements.submitWrapper.remove();

    // Remove all business cards
    elements.businessCards.forEach((card) => card.remove());

    // Uncheck all checkboxes
    elements.checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  /**
   * Creates a submit button wrapper element
   * @returns {HTMLElement} The created submit button wrapper DOM element
   */
  submitBtnWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('submit-wrapper');

    wrapper.innerHTML = `
      <div class="submit-wrapper-inner">
        <button class="submit-btn" id="one">SUBMIT</button>
      </div>
    `;

    return wrapper;
  }

  /**
   * Renders the submit button container if not already present
   * Appends the button to the service wrapper
   */
  renderSubmitBtnElement() {
    const serviceWrapper = this.querySelector('.service-wrapper');
    if (!this.querySelector('.submit-wrapper')) {
      serviceWrapper.appendChild(this.submitBtnWrapper());
    }
  }

  /**
   * Removes the submit button wrapper when no data exists
   */
  removeSubmitBtnWrapper() {
    const submitWrapper = this.querySelector('.submit-wrapper');
    if (submitWrapper) submitWrapper.remove();
  }

  /**
   * Resets saved buttons to their initial state
   * Called when all data is removed
   */
  retrieveSaveBtn() {
    const allSavedBtns = this.querySelectorAll('.save-btn.saved-btn');

    if (allSavedBtns.length > 0) {
      allSavedBtns.forEach((btn) => {
        const btnTextElement = btn.querySelector('.save-btn-text');
        btnTextElement.textContent = 'SAVE';
        btn.classList.remove('saved-btn');
      });
    }
  }

  /**
   * Configures intersection observer for the submit button
   * Hides/shows the submit button based on scrolling position
   */
  attachIntersectionObserver() {
    /**
     * Creates and configures an intersection observer
     * @param {HTMLElement} target - Element to observe
     * @param {number} threshold - Intersection threshold (0-1)
     * @param {Function} callback - Function to call when intersection changes
     */
    const obsIntersection = (target, threshold, callback) => {
      if (!target) return;

      const observer = new IntersectionObserver((entries) => entries.forEach(callback), { threshold, rootMargin: '0px' });

      observer.observe(target);
    };

    /**
     * Handles intersection events by toggling button visibility
     * @param {IntersectionObserverEntry} entry - The intersection observer entry
     */
    const handleIntersection = (entry) => {
      const submitBtnWrapper = this.querySelector('.submit-wrapper');
      if (!submitBtnWrapper) return;

      submitBtnWrapper.classList.toggle('hidden', !entry.isIntersecting);
    };

    /**
     * Sets up the observer for a specific selector
     * @param {string} selector - CSS selector for the target element
     */
    const handleObserver = (selector) => {
      const intersectionAnchor = document.querySelector(selector);
      if (intersectionAnchor) {
        obsIntersection(intersectionAnchor, 0.01, handleIntersection);
      }
    };

    // Initialize observer for service wrapper
    handleObserver('.service-wrapper');
  }

  /**
   * Creates HTML for the success modal
   * @returns {string} HTML markup for success modal
   */
  successModalShow() {
    return `
    <div class="modal">
      <div class="modal-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
          <g clip-path="url(#clip0_63_225)">
            <circle opacity="0.1" cx="30.5" cy="30.5" r="30" fill="#FF6600"></circle>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M43.5521 22.4393C44.1493 23.0251 44.1493 23.9749 43.5521 24.5607L28.2579 39.5607C27.6607 40.1464 26.6923 40.1464 26.095 39.5607L18.448 32.0607C17.8507 31.4749 17.8507 30.5251 18.448 29.9394C19.0452 29.3536 20.0136 29.3536 20.6109 29.9394L27.1765 36.3787L41.3892 22.4393C41.9864 21.8536 42.9548 21.8536 43.5521 22.4393Z" fill="#FF6600" stroke="#FF6600"></path>
          </g>
          <defs>
            <clipPath id="clip0_63_225">
              <rect width="60" height="60" fill="white" transform="translate(0.5 0.5)"></rect>
            </clipPath>
          </defs>
        </svg>
      </div>
      <h2>Thank You</h2>
      <p>Your information has been submitted successfully.</p>
      <button class="modal-btn" type="button">OK</button>
    </div>
    `.trim();
  }

  /**
   * Creates HTML for an error item in the error modal
   * @param {string} field - Field name with error
   * @param {string} message - Error message
   * @returns {string} HTML markup for error item
   */
  printErrors(field, message) {
    return `
      <li class="error-item">
        <strong>Error in "${field}": </strong>${message}
      </li>
    `.trim();
  }

  /**
   * Creates HTML for the error modal containing all validation errors
   * @param {Object} errorObj - Object containing error messages by field
   * @returns {string} HTML markup for error modal
   */
  errorModalShow(errorObj) {
    const allErrorDomStr = Object.entries(errorObj)
      .map(([field, message]) => this.printErrors(field, message))
      .join('\n');

    return `
    <div class="modal">
      <div class="modal-icon error-modal-icon-container">
        <div class="error-modal-icon">
          ${this.icons.cross}
        </div>
      </div>
      <h2>Error!</h2>
      <ul class="errors-wrapper">
        ${allErrorDomStr}
      </ul>
      <button class="modal-btn" type="button">OK</button>
    </div>
    `.trim();
  }

  /**
   * Initializes the component
   * Fetches business data and sets up event listeners
   */
  async init() {
    this.attachCheckBoxInputListener();

    const container = this.querySelector('.service-card-container');
    const businessData = await this.fetchBusinessData();

    // Render service cards if data is available
    if (businessData?.data?.length) {
      container.innerHTML = businessData.data.map(this.createServiceCard).join('');
    }

    this.attachGlobalListeners();
    this.attachCheckBoxInputListener();
  }

  /**
   * Fetches business data from the API
   * @returns {Promise<Object|null>} Business data or null on error
   */
  async fetchBusinessData() {
    try {
      // const response = await fetch('https://dev.emerchantauthority.com/api/business?itemsPerPage=100', {
      // Not using ths for now because it gives cors origin error. If this codes will be in the symfony app, then it will work.

      const response = await fetch('/api/business', {
        // used "/api/business" from a local server to avoid CORS issues
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': '7478b4a8f4632828edf3176c1d860915',
        },
      });
      return await response.json();
    } catch (err) {
      console.error('❌ Failed to fetch business data', err);
      return null;
    }
  }

  /**
   * Creates HTML for a service card
   * @param {Object} data - Service data with id and name
   * @returns {string} HTML markup for service card
   */
  createServiceCard({ id, name }) {
    const slug = name.replace(/\s+/g, '_');
    return `
      <div class="service-card" data-id="${id}">
        <div class="service-checkbox">
          <input type="checkbox" class="service-card__checkbox" id="${slug}" value="${name}" />
          <label class="service-card__title" for="${slug}"><span class="service-card__content">${name}</span></label>
        </div>
        <div class="service-card__action">
          <button class="add-business__btn">Add Business</button>
        </div>
        <div class="form-container"></div>
      </div>
    `;
  }

  /**
   * Attaches global event listeners for all interactive elements
   * Uses event delegation for improved performance
   */
  attachGlobalListeners() {
    document.body.addEventListener('click', (e) => {
      const { target } = e;

      // Handle "Add Business" button click
      if (target.closest('.add-business__btn')) {
        const clickedItem = target.closest('.add-business__btn');
        const cardWrapper = clickedItem.closest('.service-card');
        const formContainer = cardWrapper.querySelector('.form-container');

        this.addBusiness(clickedItem);

        // Toggle class based on whether form container has children
        cardWrapper.classList.toggle('business-option-added', formContainer.children.length >= 1);
      }

      // Handle "Remove" button click
      else if (target.closest('.remove-btn')) {
        const clickedItem = target.closest('.remove-btn');
        const cardWrapper = clickedItem.closest('.service-card');
        const formContainer = cardWrapper.querySelector('.form-container');
        const businessCard = clickedItem.closest('.business-card');
        const previousBusinessCard = businessCard.previousElementSibling;
        const nextBusinessCard = businessCard.nextElementSibling;

        this.removeBusiness(clickedItem);
        const collectedData = this.removeInformation(cardWrapper, businessCard);

        // Update UI based on remaining data
        if (collectedData?.length === 0) {
          this.removeSubmitBtnWrapper();
          this.retrieveSaveBtn();
        }

        // Show add another business button on the last card if it was hidden
        if (previousBusinessCard && !nextBusinessCard) {
          const addButton = previousBusinessCard.querySelector('.add-business-entry-btn');
          if (addButton) addButton.classList.remove('hidden-element');
        }

        // Toggle class based on whether form container has children
        cardWrapper.classList.toggle('business-option-added', formContainer.children.length >= 1);
      }

      // Handle "Add Another Business" button click
      else if (target.closest('.add-business-entry-btn')) {
        const clickedItem = target.closest('.add-business-entry-btn');
        clickedItem.classList.add('hidden-element');
        this.addBusiness(clickedItem);
      }

      // Handle "Save" button click (only if not already saved)
      else if (target.closest('.save-btn:not(.saved-btn)')) {
        const clickedItem = target.closest('.save-btn');
        const saveBtnTextElem = clickedItem.querySelector('.save-btn-text');
        const wrapper = clickedItem.closest('.service-card');
        const businessCard = clickedItem.closest('.business-card');

        // Update button state
        clickedItem.classList.add('saved-btn');
        saveBtnTextElem.textContent = 'SAVED';

        // Store information and update UI
        const collectedData = this.storeInformation(wrapper, businessCard);
        if (collectedData.length > 0) {
          this.renderSubmitBtnElement();
          this.attachIntersectionObserver();
        }
      }

      // Handle "Submit" button click
      else if (target.closest('.submit-btn')) {
        const clickedItem = target.closest('.submit-btn');
        const buttonId = clickedItem.id;
        const modalContainer = document.getElementById('modal-container');
        const modalWrapper = modalContainer.closest('.modal-wrapper');
        const modalBody = modalWrapper.querySelector('.modal-background');

        // Submit data if available
        if (this.__businessData.length > 0) {
          this.sendLeadData(this.__businessData).then((result) => {
            // Reset modal classes
            modalContainer.className = '';
            modalContainer.classList.add(buttonId);
            modalWrapper.classList.add('modal-active');

            // Show success or error modal based on result
            modalBody.innerHTML = result?.success ? this.successModalShow() : this.errorModalShow(result.error);
          });
        }
      }

      // Handle modal close (clicking background or OK button)
      else if (target.matches('.modal-background') || target.closest('.modal-btn')) {
        const modalContainer = document.getElementById('modal-container');
        const modalWrapper = modalContainer.closest('.modal-wrapper');
        modalContainer.classList.add('out');
        modalWrapper.classList.remove('modal-active');
        this.resetDom();
      }
    });
  }

  /**
   * Validates form inputs and shows error messages
   * Enables/disables buttons based on validation results
   * @param {HTMLElement} input - The input element being validated
   */
  validateForm(input) {
    const card = input.closest('.business-card');
    const fields = card.querySelectorAll('input');
    const saveBtn = card.querySelector('.save-btn');
    const addBtn = card.querySelector('.add-business-entry-btn');

    /**
     * Validates email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid
     */
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    /**
     * Validates phone number using libphonenumber library
     * @param {string} phone - Phone number to validate
     * @returns {boolean} True if valid
     */
    const validatePhone = (phone) => {
      const { parsePhoneNumberFromString } = window.libphonenumber;
      try {
        const parsed = parsePhoneNumberFromString(phone);
        return parsed?.isValid() || false;
      } catch {
        return false;
      }
    };

    /**
     * Displays error message for a field
     * @param {HTMLElement} field - Field with error
     * @param {string} message - Error message to display
     */
    const showError = (field, message) => {
      const errorDiv = field.parentElement.querySelector('.error-message');
      errorDiv.textContent = message;
      errorDiv.style.color = 'red';
    };

    /**
     * Clears error message for a field
     * @param {HTMLElement} field - Field to clear error from
     */
    const clearError = (field) => {
      field.parentElement.querySelector('.error-message').textContent = '';
    };

    /**
     * Validates a single field based on rules
     * @param {HTMLElement} field - Field to validate
     * @param {boolean} showErrorOnlyForThis - Whether to show error messages
     * @returns {boolean} True if valid
     */
    const validateField = (field, showErrorOnlyForThis = false) => {
      const value = field.value.trim();

      // Clear previous error if validating this specific field
      if (showErrorOnlyForThis) clearError(field);

      // Required field validation
      if (!value) {
        if (showErrorOnlyForThis) showError(field, 'This field is required');
        return false;
      }

      // Business name length validation
      if (field.id === 'businessName' && value.length < 3) {
        if (showErrorOnlyForThis) showError(field, 'Business name must be at least 3 characters');
        return false;
      }

      // Email format validation
      if (field.id === 'contactEmail' && !validateEmail(value)) {
        if (showErrorOnlyForThis) showError(field, 'Enter a valid email address');
        return false;
      }

      // Phone number validation
      if (field.id === 'contactPhone' && !validatePhone(value)) {
        if (showErrorOnlyForThis) showError(field, 'Enter a valid phone number');
        return false;
      }

      return true;
    };

    // Validate current input with error display
    validateField(input, true);

    // Check if all fields are valid
    const allValid = Array.from(fields).every((field) => validateField(field, false));

    // Enable/disable buttons based on validation
    saveBtn.disabled = !allValid;
    addBtn.disabled = !allValid;
  }

  /**
   * Extracts validation errors from API response
   * @param {string} jsonString - JSON response string
   * @returns {Object} Formatted error messages by field
   */
  extractValidationErrors(jsonString) {
    const result = {};
    const parsed = JSON.parse(jsonString);

    for (const index in parsed.errors) {
      const fields = parsed.errors[index];
      for (const fieldName in fields) {
        const fieldErrors = fields[fieldName];
        // Combine all messages for this field
        result[fieldName] = Object.values(fieldErrors).join(', ');
      }
    }

    return result;
  }

  /**
   * Sends collected lead data to the API
   * @param {Array} payload - Business data to send
   * @returns {Promise<Object>} Response with success status and data/error
   */
  async sendLeadData(payload) {
    try {
      // const response = await fetch('https://dev.emerchantauthority.com/api/lead', {
      // Not using ths for now because it gives cors origin error. If this codes will be in the symfony app, then it will work.
      const response = await fetch('/api/lead', {
        // used "/api/lead" from a local server to avoid CORS issues

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      // Handle error response
      if (!response.ok) {
        return {
          success: false,
          status: response.status,
          error: this.extractValidationErrors(responseData),
        };
      }

      // Handle success response
      return {
        success: true,
        status: response.status,
        data: responseData,
      };
    } catch (error) {
      console.error('❌ Error while sending lead data:', error.message);
      return {
        success: false,
        error: { message: error.message },
      };
    }
  }
}

// Register custom element if not already defined
if (!customElements.get('business-service-form')) {
  customElements.define('business-service-form', BusinessServiceForm);
}
