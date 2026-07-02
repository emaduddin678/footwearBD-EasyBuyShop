"use client"

import { useEffect, useState } from "react"
import { useAppSelector } from "@/lib/store/hooks"
import userApi, { type Address, type AddressInput } from "@/lib/api/user"

const LABEL_ICONS: Record<string, string> = {
  Home: "🏠",
  Office: "🏢",
  Other: "📍",
}

const CITIES = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"]

const emptyForm: AddressInput = {
  label: "Home",
  recipientName: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "Dhaka",
  district: "",
  division: "",
  postalCode: "",
  isDefault: false,
}

export default function AddressBook() {
  const userId = useAppSelector((s) => s.auth.user?._id)

  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<AddressInput>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    let cancelled = false
    userApi.getAddresses(userId)
      .then((res) => { if (!cancelled) setAddresses(res.addresses) })
      .catch((err) => { if (!cancelled) setError(err.message || "Failed to load addresses") })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [userId])

  function openAddForm() {
    setForm(emptyForm)
    setFormError("")
    setEditingId(null)
    setShowForm(true)
  }

  function openEditForm(addr: Address) {
    setForm({
      label: addr.label ?? "Home",
      recipientName: addr.recipientName ?? "",
      phoneNumber: addr.phoneNumber ?? "",
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 ?? "",
      city: addr.city,
      district: addr.district ?? "",
      division: addr.division ?? "",
      postalCode: addr.postalCode ?? "",
      isDefault: addr.isDefault,
    })
    setFormError("")
    setEditingId(addr._id)
    setShowForm(true)
  }

  async function handleSave() {
    if (!userId) return
    if (!form.addressLine1.trim() || !form.city.trim()) {
      setFormError("Street/House and City are required.")
      return
    }
    setSaving(true)
    setFormError("")
    try {
      if (editingId) {
        const updated = await userApi.updateAddress(userId, editingId, form)
        setAddresses((prev) => prev.map((a) => (a._id === editingId ? updated : a)))
        if (form.isDefault) {
          await userApi.setDefaultAddress(userId, editingId)
          setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a._id === editingId })))
        }
      } else {
        const created = await userApi.addAddress(userId, form)
        setAddresses((prev) => (form.isDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev).concat(created))
      }
      setShowForm(false)
      setEditingId(null)
    } catch (err) {
      setFormError((err as Error).message || "Failed to save address")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!userId) return
    try {
      await userApi.deleteAddress(userId, id)
      setAddresses((prev) => prev.filter((a) => a._id !== id))
    } catch (err) {
      setError((err as Error).message || "Failed to delete address")
    } finally {
      setDeleteConfirmId(null)
    }
  }

  async function handleSetDefault(id: string) {
    if (!userId) return
    try {
      await userApi.setDefaultAddress(userId, id)
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a._id === id })))
    } catch (err) {
      setError((err as Error).message || "Failed to set default address")
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl text-[#1A2B5E]">Address Book</h2>
        <button
          onClick={openAddForm}
          className="text-sm border border-[#1A2B5E] text-[#1A2B5E] px-4 py-2 rounded-lg hover:bg-[#1A2B5E] hover:text-white transition-colors"
        >
          + Add New Address
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-sm text-gray-400">Loading addresses…</div>
      ) : error ? (
        <div className="text-center py-16 text-sm text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {addresses.length === 0 && !showForm && (
            <p className="text-sm text-gray-500 md:col-span-2">No saved addresses yet.</p>
          )}
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`bg-white rounded-xl p-5 ${
                addr.isDefault ? "border-2 border-[#1A2B5E]" : "border border-gray-200"
              }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 bg-[#1A2B5E] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {LABEL_ICONS[addr.label ?? ""] ?? "📍"} {addr.label ?? "Address"}
                </span>
                {addr.isDefault && (
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                    ✓ Default
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="mt-3">
                <p className="font-medium text-[#1A2B5E]">{addr.recipientName}</p>
                <p className="text-sm text-gray-600 mt-1">{addr.phoneNumber}</p>
                <p className="text-sm text-gray-600 mt-1">{addr.addressLine1}</p>
                {addr.addressLine2 && <p className="text-sm text-gray-600">{addr.addressLine2}</p>}
                <p className="text-sm text-gray-600">{addr.city} — {addr.postalCode}</p>
              </div>

              {/* Actions */}
              {deleteConfirmId === addr._id ? (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-700 mb-2">Delete this address?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(addr._id)}
                      className="text-sm bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-4">
                  <button
                    onClick={() => openEditForm(addr)}
                    className="text-sm text-[#1A2B5E] hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(addr._id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr._id)}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      ✓ Set as Default
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit form */}
      {showForm && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-[#1A2B5E] mb-4">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
              <select
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E]"
              >
                {["Home", "Office", "Other"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.recipientName}
                onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street / House</label>
              <input
                type="text"
                value={form.addressLine1}
                onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <input
                type="text"
                value={form.addressLine2}
                onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E]"
              >
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E]"
              />
            </div>
            <div className="flex items-center gap-2 self-end pb-2.5">
              <input
                type="checkbox"
                id="setDefault"
                checked={form.isDefault}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                className="w-4 h-4 accent-[#1A2B5E]"
              />
              <label htmlFor="setDefault" className="text-sm text-gray-700">
                Set as default address
              </label>
            </div>
          </div>
          {formError && <p className="text-sm text-red-500 mt-3">{formError}</p>}
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#1A2B5E] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0d1733] transition-colors disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Address"}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditingId(null) }}
              className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
