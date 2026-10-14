import { initialDonations, initialRequests } from '../data/mockData';

export const donationService = {
  getDonations: () => {
    const data = localStorage.getItem('sfr_donations');
    if (!data) {
      localStorage.setItem('sfr_donations', JSON.stringify(initialDonations));
      return initialDonations;
    }
    return JSON.parse(data);
  },

  saveDonations: (donations) => {
    localStorage.setItem('sfr_donations', JSON.stringify(donations));
  },

  getRequests: () => {
    const data = localStorage.getItem('sfr_requests');
    if (!data) {
      localStorage.setItem('sfr_requests', JSON.stringify(initialRequests));
      return initialRequests;
    }
    return JSON.parse(data);
  },

  saveRequests: (requests) => {
    localStorage.setItem('sfr_requests', JSON.stringify(requests));
  },

  createDonation: (donationData, currentUser) => {
    const donations = donationService.getDonations();
    const newId = `FD-2026-${String(donations.length + 1).padStart(4, '0')}`;
    const newDonation = {
      id: newId,
      donorId: currentUser.id,
      donorName: currentUser.name || currentUser.organizationName || 'Food Donor',
      ...donationData,
      status: 'Available',
      ngoRequestId: null,
      ngoName: null,
      volunteerId: null,
      volunteerName: null,
      createdAt: new Date().toISOString(),
      timeline: [
        { step: 'Donation Created', time: new Date().toLocaleString(), completed: true }
      ]
    };
    donations.unshift(newDonation);
    donationService.saveDonations(donations);
    return newDonation;
  },

  requestDonation: (donationId, ngoUser, mealsNeeded, preferredTime) => {
    const donations = donationService.getDonations();
    const requests = donationService.getRequests();
    
    const donation = donations.find(d => d.id === donationId);
    if (!donation) throw new Error('Donation not found');

    const newReq = {
      id: 'req_' + Date.now(),
      donationId,
      ngoId: ngoUser.id,
      ngoName: ngoUser.name || 'NGO Organization',
      mealsNeeded: Number(mealsNeeded),
      preferredTime,
      status: 'Requested',
      createdAt: new Date().toISOString()
    };
    requests.unshift(newReq);
    donationService.saveRequests(requests);

    donation.status = 'Requested';
    donation.ngoRequestId = newReq.id;
    donation.ngoName = ngoUser.name;
    donation.timeline.push({ step: 'NGO Request Submitted', time: new Date().toLocaleString(), completed: true });
    donationService.saveDonations(donations);
    return newReq;
  },

  acceptRequest: (donationId) => {
    const donations = donationService.getDonations();
    const donation = donations.find(d => d.id === donationId);
    if (donation) {
      donation.status = 'Accepted';
      donation.timeline.push({ step: 'NGO Accepted', time: new Date().toLocaleString(), completed: true });
      donationService.saveDonations(donations);
    }
    return donation;
  },

  assignVolunteer: (donationId, volunteerId, volunteerName) => {
    const donations = donationService.getDonations();
    const donation = donations.find(d => d.id === donationId);
    if (donation) {
      donation.status = 'Assigned';
      donation.volunteerId = volunteerId;
      donation.volunteerName = volunteerName;
      donation.timeline.push({ step: `Volunteer Assigned (${volunteerName})`, time: new Date().toLocaleString(), completed: true });
      donationService.saveDonations(donations);
    }
    return donation;
  },

  updateDeliveryStatus: (donationId, newStatus) => {
    const donations = donationService.getDonations();
    const donation = donations.find(d => d.id === donationId);
    if (donation) {
      donation.status = newStatus;
      donation.timeline.push({ step: `Status updated to ${newStatus}`, time: new Date().toLocaleString(), completed: true });
      donationService.saveDonations(donations);
    }
    return donation;
  },

  confirmReceipt: (donationId) => {
    const donations = donationService.getDonations();
    const donation = donations.find(d => d.id === donationId);
    if (donation) {
      donation.status = 'Delivered & Confirmed';
      donation.timeline.push({ step: 'NGO Confirmed Receipt & Distribution', time: new Date().toLocaleString(), completed: true });
      donationService.saveDonations(donations);
    }
    return donation;
  },

  resetDemoData: () => {
    localStorage.setItem('sfr_donations', JSON.stringify(initialDonations));
    localStorage.setItem('sfr_requests', JSON.stringify(initialRequests));
  }
};
