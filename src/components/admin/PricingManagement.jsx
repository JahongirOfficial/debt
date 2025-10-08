import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

export function PricingManagement() {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: 'month',
    debtLimit: '',
    features: []
  });

  const planColors = {
    'Bepul': 'from-gray-500 to-gray-600',
    'Standart': 'from-orange-500 to-orange-600',
    'Pro': 'from-purple-500 to-purple-600'
  };

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/admin/pricing', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPricingPlans(data.plans);
      }
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePricingPlan = async (planId, updatedPlan) => {
    try {
      const response = await apiFetch(`/admin/pricing/${planId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlan),
      });

      if (response.ok) {
        setPricingPlans(pricingPlans.map(plan =>
          plan.id === planId ? { ...plan, ...updatedPlan } : plan
        ));
        setEditingPlan(null);
      }
    } catch (error) {
      console.error('Error updating pricing plan:', error);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan.id);
    setFormData({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      debtLimit: plan.debtLimit,
      features: plan.features || []
    });
  };

  const handleSave = () => {
    updatePricingPlan(editingPlan, formData);
  };

  const handleCancel = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      price: '',
      period: 'month',
      debtLimit: '',
      features: []
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white bg-opacity-20 rounded-lg w-1/3 mb-2"></div>
            <div className="h-4 bg-white bg-opacity-20 rounded w-1/2"></div>
          </div>
        </div>

        {/* Plans skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-8">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tarif Rejalarini Boshqarish</h1>
            <p className="text-purple-100 text-lg">
              Tarif rejalarini tahrirlash va yangilash
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => {
          const gradient = planColors[plan.name] || 'from-gray-500 to-gray-600';
          return (
            <div key={plan.id} className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transform hover:scale-105 transition-all duration-300 flex flex-col h-full">

              {/* Plan Header */}
              <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{plan.price === '0' ? 'Bepul' : plan.price}</span>
                      {plan.price !== '0' && (
                        <span className="text-lg ml-2 opacity-80">
                          UZS/{plan.period === 'month' ? 'oyiga' : 'yiliga'}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                {editingPlan === plan.id ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nomi</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Narx</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Davomiyligi</label>
                      <select
                        value={formData.period}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="month">Oyiga</option>
                        <option value="year">Yiliga</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Qarzlar chegarasi</label>
                      <input
                        type="number"
                        value={formData.debtLimit}
                        onChange={(e) => setFormData({ ...formData, debtLimit: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Imkoniyatlar</label>
                      <div className="space-y-3">
                        {formData.features.map((feature, index) => (
                          <div key={index} className="flex space-x-3">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Imkoniyat nomi"
                            />
                            <button
                              onClick={() => removeFeature(index)}
                              className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addFeature}
                          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span>Imkoniyat qo'shish</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        Saqlash
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        Bekor qilish
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    {/* Plan Details */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Qarzlar chegarasi:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{plan.debtLimit} ta</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Imkoniyatlar:</h4>
                      {plan.features?.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="mt-8">
                      <button
                        onClick={() => handleEdit(plan)}
                        className={`w-full bg-gradient-to-r ${gradient} hover:shadow-lg text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105`}
                      >
                        Tahrirlash
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

