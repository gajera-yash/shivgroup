/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormImageUpload, FormActions, FormSelect } from '../components/Modal';
import api from '../../utils/api';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const AwardsManager = () => {
  const [showAddAward, setShowAddAward] = useState(false);
  const [showEditAward, setShowEditAward] = useState(false);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [showEditPartner, setShowEditPartner] = useState(false);

  const [awardsList, setAwardsList] = useState([]);
  const [isAwardsLoading, setIsAwardsLoading] = useState(false);
  const [isAwardSubmitting, setIsAwardSubmitting] = useState(false);
  const [awardFormError, setAwardFormError] = useState('');
  const [editAwardError, setEditAwardError] = useState('');

  const [awardTitle, setAwardTitle] = useState('');
  const [awardOrganization, setAwardOrganization] = useState('');
  const [awardYear, setAwardYear] = useState('');
  const [awardStatus, setAwardStatus] = useState('active');
  const [awardImage, setAwardImage] = useState(null);

  const [editingAwardId, setEditingAwardId] = useState('');
  const [editAwardTitle, setEditAwardTitle] = useState('');
  const [editAwardOrganization, setEditAwardOrganization] = useState('');
  const [editAwardYear, setEditAwardYear] = useState('');
  const [editAwardStatus, setEditAwardStatus] = useState('active');
  const [editAwardImage, setEditAwardImage] = useState(null);
  const [editAwardImagePreview, setEditAwardImagePreview] = useState(null);

  const [partnersList, setPartnersList] = useState([]);
  const [isPartnersLoading, setIsPartnersLoading] = useState(false);
  const [isPartnerSubmitting, setIsPartnerSubmitting] = useState(false);
  const [partnerFormError, setPartnerFormError] = useState('');
  const [editPartnerError, setEditPartnerError] = useState('');

  const [partnerName, setPartnerName] = useState('');
  const [partnerStatus, setPartnerStatus] = useState('active');
  const [partnerImage, setPartnerImage] = useState(null);

  const [editingPartnerId, setEditingPartnerId] = useState('');
  const [editPartnerName, setEditPartnerName] = useState('');
  const [editPartnerStatus, setEditPartnerStatus] = useState('active');
  const [editPartnerImage, setEditPartnerImage] = useState(null);
  const [editPartnerImagePreview, setEditPartnerImagePreview] = useState(null);

  const mapPartner = (p) => ({
    id: p?.id,
    name: p?.partner_name || '',
    logo: p?.partner_image || null,
    active: Number(p?.status) === 1,
  });

  const mapAward = (a) => ({
    id: a?.id,
    title: a?.award_title || '',
    org: a?.organization || '',
    year: a?.year || '',
    image: a?.award_image || null,
    active: Number(a?.status) === 1,
  });

  const getErrorMessage = (err, fallback) => {
    const apiErrors = err?.response?.data?.errors;
    const firstValidationError = apiErrors ? Object.values(apiErrors)?.[0]?.[0] : null;
    return firstValidationError || err?.response?.data?.message || fallback;
  };

  const fetchAwards = async () => {
    setIsAwardsLoading(true);
    try {
      const res = await api.get('awards');
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setAwardsList(list.map(mapAward));
    } catch {
      setAwardsList([]);
    } finally {
      setIsAwardsLoading(false);
    }
  };

  const fetchPartners = async () => {
    setIsPartnersLoading(true);
    try {
      const res = await api.get('partners');
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setPartnersList(list.map(mapPartner));
    } catch {
      setPartnersList([]);
    } finally {
      setIsPartnersLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchAwards(), fetchPartners()]);
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetAddAwardForm = () => {
    setAwardTitle('');
    setAwardOrganization('');
    setAwardYear('');
    setAwardStatus('active');
    setAwardImage(null);
    setAwardFormError('');
  };

  const resetEditAwardForm = () => {
    setEditingAwardId('');
    setEditAwardTitle('');
    setEditAwardOrganization('');
    setEditAwardYear('');
    setEditAwardStatus('active');
    setEditAwardImage(null);
    setEditAwardImagePreview(null);
    setEditAwardError('');
  };

  const handleAddAward = async (e) => {
    e.preventDefault();
    setAwardFormError('');

    if (!awardTitle.trim() || !awardOrganization.trim() || !awardYear.toString().trim()) {
      setAwardFormError('Award Title, Organization and Year are required.');
      return;
    }

    setIsAwardSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('award_title', awardTitle.trim());
      fd.append('organization', awardOrganization.trim());
      fd.append('year', awardYear.toString().trim());
      fd.append('status', awardStatus === 'active' ? '1' : '0');
      if (awardImage) fd.append('award_image', awardImage);

      const res = await api.post('add-awards', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const created = mapAward(res?.data?.data || {});
      setAwardsList((prev) => [created, ...prev.filter((a) => a.id !== created.id)]);
      alert(res?.data?.message || 'Award added successfully.');
      setShowAddAward(false);
      resetAddAwardForm();
    } catch (err) {
      setAwardFormError(getErrorMessage(err, 'Failed to add award.'));
    } finally {
      setIsAwardSubmitting(false);
    }
  };

  const openEditAward = async (id) => {
    setEditAwardError('');
    setEditAwardImage(null);
    try {
      const res = await api.get(`fetch-awards/${id}`);
      const award = res?.data?.data;
      setEditingAwardId(id);
      setEditAwardTitle(award?.award_title || '');
      setEditAwardOrganization(award?.organization || '');
      setEditAwardYear(award?.year || '');
      setEditAwardStatus(Number(award?.status) === 1 ? 'active' : 'draft');
      setEditAwardImagePreview(award?.award_image || null);
      setShowEditAward(true);
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to fetch award details.'));
    }
  };

  const handleEditAward = async (e) => {
    e.preventDefault();
    setEditAwardError('');

    if (!editAwardTitle.trim() || !editAwardOrganization.trim() || !editAwardYear.toString().trim()) {
      setEditAwardError('Award Title, Organization and Year are required.');
      return;
    }

    setIsAwardSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('edit', editingAwardId);
      fd.append('award_title', editAwardTitle.trim());
      fd.append('organization', editAwardOrganization.trim());
      fd.append('year', editAwardYear.toString().trim());
      fd.append('status', editAwardStatus === 'active' ? '1' : '0');
      if (editAwardImage) fd.append('award_image', editAwardImage);

      const res = await api.post('add-awards', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const updated = mapAward(res?.data?.data || {});
      setAwardsList((prev) => prev.map((a) => (a.id === editingAwardId ? updated : a)));
      alert(res?.data?.message || 'Award updated successfully.');
      setShowEditAward(false);
      resetEditAwardForm();
    } catch (err) {
      setEditAwardError(getErrorMessage(err, 'Failed to update award.'));
    } finally {
      setIsAwardSubmitting(false);
    }
  };

  const handleDeleteAward = async (id) => {
    if (!window.confirm('Are you sure you want to delete this award?')) return;
    try {
      const res = await api.get(`delete-awards/${id}`);
      setAwardsList((prev) => prev.filter((a) => a.id !== id));
      alert(res?.data?.message || 'Award deleted successfully.');
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to delete award.'));
    }
  };

  const resetAddPartnerForm = () => {
    setPartnerName('');
    setPartnerStatus('active');
    setPartnerImage(null);
    setPartnerFormError('');
  };

  const resetEditPartnerForm = () => {
    setEditingPartnerId('');
    setEditPartnerName('');
    setEditPartnerStatus('active');
    setEditPartnerImage(null);
    setEditPartnerImagePreview(null);
    setEditPartnerError('');
  };

  const handleAddPartner = async (e) => {
    e.preventDefault();
    setPartnerFormError('');

    if (!partnerName.trim()) {
      setPartnerFormError('Partner / Client Name is required.');
      return;
    }
    if (!partnerImage) {
      setPartnerFormError('Company Logo is required.');
      return;
    }

    setIsPartnerSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('partner_name', partnerName.trim());
      fd.append('partner_image', partnerImage);
      fd.append('status', partnerStatus === 'active' ? '1' : '0');

      const res = await api.post('add-partners', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const created = mapPartner(res?.data?.data || {});
      setPartnersList((prev) => [created, ...prev.filter((p) => p.id !== created.id)]);
      alert(res?.data?.message || 'Partner added successfully.');
      setShowAddPartner(false);
      resetAddPartnerForm();
    } catch (err) {
      setPartnerFormError(getErrorMessage(err, 'Failed to add partner.'));
    } finally {
      setIsPartnerSubmitting(false);
    }
  };

  const openEditPartner = async (id) => {
    setEditPartnerError('');
    setEditPartnerImage(null);
    try {
      const res = await api.get(`fetch-partners/${id}`);
      const partner = res?.data?.data;
      setEditingPartnerId(id);
      setEditPartnerName(partner?.partner_name || '');
      setEditPartnerStatus(Number(partner?.status) === 1 ? 'active' : 'draft');
      setEditPartnerImagePreview(partner?.partner_image || null);
      setShowEditPartner(true);
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to fetch partner details.'));
    }
  };

  const handleEditPartner = async (e) => {
    e.preventDefault();
    setEditPartnerError('');

    if (!editPartnerName.trim()) {
      setEditPartnerError('Partner / Client Name is required.');
      return;
    }

    setIsPartnerSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('edit', editingPartnerId);
      fd.append('partner_name', editPartnerName.trim());
      fd.append('status', editPartnerStatus === 'active' ? '1' : '0');
      if (editPartnerImage) fd.append('partner_image', editPartnerImage);

      const res = await api.post('add-partners', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const updated = mapPartner(res?.data?.data || {});
      setPartnersList((prev) => prev.map((p) => (p.id === editingPartnerId ? updated : p)));
      alert(res?.data?.message || 'Partner updated successfully.');
      setShowEditPartner(false);
      resetEditPartnerForm();
    } catch (err) {
      setEditPartnerError(getErrorMessage(err, 'Failed to update partner.'));
    } finally {
      setIsPartnerSubmitting(false);
    }
  };

  const handleDeletePartner = async (id) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;
    try {
      const res = await api.get(`delete-partners/${id}`);
      setPartnersList((prev) => prev.filter((p) => p.id !== id));
      alert(res?.data?.message || 'Partner deleted successfully.');
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to delete partner.'));
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Awards */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Awards</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manage company awards and achievements</p>
          </div>
          <button onClick={() => setShowAddAward(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
            <HiOutlinePlus className="w-4 h-4" /> Add Award
          </button>
        </div>
        <div className="p-6 space-y-3">
          {isAwardsLoading ? (
            <p className="text-sm text-slate-500">Loading awards...</p>
          ) : awardsList.length === 0 ? (
            <p className="text-sm text-slate-500">No awards found.</p>
          ) : awardsList.map((award) => (
            <div key={award.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🏆</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800">{award.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{award.org} • {award.year}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => openEditAward(award.id)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><HiOutlinePencil className="w-4 h-4" /></button>
                <button onClick={() => handleDeleteAward(award.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><HiOutlineTrash className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trusted Partners */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Trusted Partners</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manage partner and client logos</p>
          </div>
          <button onClick={() => setShowAddPartner(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
            <HiOutlinePlus className="w-4 h-4" /> Add Partner
          </button>
        </div>
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isPartnersLoading ? (
            <p className="text-sm text-slate-500 col-span-full">Loading partners...</p>
          ) : partnersList.length === 0 ? (
            <p className="text-sm text-slate-500 col-span-full">No partners found.</p>
          ) : partnersList.map((p) => (
            <div key={p.id} className="relative group p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex flex-col items-center">
              <div className="w-full h-16 flex items-center justify-center mb-2">
                <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <p className="text-xs text-slate-500 font-medium text-center">{p.name}</p>
              <span className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.active ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                {p.active ? 'Active' : 'Draft'}
              </span>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEditPartner(p.id)} className="p-1 rounded-md bg-white shadow-sm hover:bg-slate-100 text-slate-400"><HiOutlinePencil className="w-3 h-3" /></button>
                <button onClick={() => handleDeletePartner(p.id)} className="p-1 rounded-md bg-white shadow-sm hover:bg-red-50 text-slate-400 hover:text-red-500"><HiOutlineTrash className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Award Modal */}
      <Modal isOpen={showAddAward} onClose={() => setShowAddAward(false)} title="Add Award" subtitle="Add a new company award or achievement" size="md">
        <form onSubmit={handleAddAward} className="space-y-4">
          {awardFormError && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{awardFormError}</div>}
          <FormInput label="Award Title" required placeholder="e.g. Best Construction Firm 2024" value={awardTitle} onChange={(e) => setAwardTitle(e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Organization" required placeholder="e.g. National Builder Awards" value={awardOrganization} onChange={(e) => setAwardOrganization(e.target.value)} />
            <FormInput label="Year" required placeholder="e.g. 2024" type="number" value={awardYear} onChange={(e) => setAwardYear(e.target.value)} />
          </div>
          <FormImageUpload label="Award Certificate / Image" onImageSelect={setAwardImage} />
          <FormSelect
            label="Status"
            value={awardStatus}
            onChange={(e) => setAwardStatus(e.target.value)}
            options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }]}
          />
          <FormActions onCancel={() => { setShowAddAward(false); resetAddAwardForm(); }} submitText="Add Award" isLoading={isAwardSubmitting} />
        </form>
      </Modal>

      {/* Edit Award Modal */}
      <Modal isOpen={showEditAward} onClose={() => { setShowEditAward(false); resetEditAwardForm(); }} title="Edit Award" subtitle="Update company award or achievement" size="md">
        <form onSubmit={handleEditAward} className="space-y-4">
          {editAwardError && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{editAwardError}</div>}
          <FormInput label="Award Title" required value={editAwardTitle} onChange={(e) => setEditAwardTitle(e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Organization" required value={editAwardOrganization} onChange={(e) => setEditAwardOrganization(e.target.value)} />
            <FormInput label="Year" required type="number" value={editAwardYear} onChange={(e) => setEditAwardYear(e.target.value)} />
          </div>
          <FormImageUpload label="Award Certificate / Image " initialPreview={editAwardImagePreview} onImageSelect={setEditAwardImage} />
          <FormSelect
            label="Status"
            value={editAwardStatus}
            onChange={(e) => setEditAwardStatus(e.target.value)}
            options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }]}
          />
          <FormActions onCancel={() => { setShowEditAward(false); resetEditAwardForm(); }} submitText="Update Award" isLoading={isAwardSubmitting} />
        </form>
      </Modal>

      {/* Add Partner Modal */}
      <Modal isOpen={showAddPartner} onClose={() => setShowAddPartner(false)} title="Add Partner" subtitle="Add a new trusted partner or client logo" size="sm">
        <form onSubmit={handleAddPartner} className="space-y-4">
          {partnerFormError && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{partnerFormError}</div>}
          <FormInput label="Partner / Client Name" required placeholder="e.g. Ultratech Cement" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} />
          <FormImageUpload label="Company Logo" onImageSelect={setPartnerImage} />
          <FormSelect
            label="Status"
            value={partnerStatus}
            onChange={(e) => setPartnerStatus(e.target.value)}
            options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }]}
          />
          <FormActions onCancel={() => { setShowAddPartner(false); resetAddPartnerForm(); }} submitText="Add Partner" isLoading={isPartnerSubmitting} />
        </form>
      </Modal>

      {/* Edit Partner Modal */}
      <Modal isOpen={showEditPartner} onClose={() => { setShowEditPartner(false); resetEditPartnerForm(); }} title="Edit Partner" subtitle="Update trusted partner details" size="sm">
        <form onSubmit={handleEditPartner} className="space-y-4">
          {editPartnerError && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{editPartnerError}</div>}
          <FormInput label="Partner / Client Name" required value={editPartnerName} onChange={(e) => setEditPartnerName(e.target.value)} />
          <FormImageUpload label="Company Logo " initialPreview={editPartnerImagePreview} onImageSelect={setEditPartnerImage} />
          <FormSelect
            label="Status"
            value={editPartnerStatus}
            onChange={(e) => setEditPartnerStatus(e.target.value)}
            options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }]}
          />
          <FormActions onCancel={() => { setShowEditPartner(false); resetEditPartnerForm(); }} submitText="Update Partner" isLoading={isPartnerSubmitting} />
        </form>
      </Modal>
    </motion.div>
  );
};

export default AwardsManager;
