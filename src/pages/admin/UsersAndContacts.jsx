import { useState, useEffect } from 'react';
import { UserService } from '../../api/users.api';
import { ContactService } from '../../api/contacts.api';
import { Plus, Users, User, Mail, Phone, Briefcase } from 'lucide-react';

const UsersAndContacts = () => {
    const [activeTab, setActiveTab] = useState('contacts'); // 'contacts' or 'users'
    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Forms
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactData, setContactData] = useState({ name: '', email: '', type: 'customer', phone: '' });

    const [showUserForm, setShowUserForm] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [cData, uData] = await Promise.all([
                ContactService.getAll(),
                UserService.getAll()
            ]);
            setContacts(cData);
            setUsers(uData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateContact = async (e) => {
        e.preventDefault();
        try {
            await ContactService.create(contactData);
            setShowContactForm(false);
            setContactData({ name: '', email: '', type: 'customer', phone: '' });
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await UserService.signup(userData);
            setShowUserForm(false);
            setUserData({ name: '', email: '', password: '' });
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Users & Contacts</h1>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button onClick={() => setActiveTab('contacts')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'contacts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        <Briefcase className="w-4 h-4 mr-2" />
                        Contacts (Customers/Vendors)
                    </button>
                    <button onClick={() => setActiveTab('users')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        <Users className="w-4 h-4 mr-2" />
                        System Users
                    </button>
                </nav>
            </div>

            {/* CONTACTS TAB */}
            {activeTab === 'contacts' && (
                <div>
                    <div className="flex justify-end mb-4">
                        <button onClick={() => setShowContactForm(!showContactForm)} className="btn btn-primary">
                            <Plus className="h-4 w-4 mr-2" /> New Contact
                        </button>
                    </div>

                    {showContactForm && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-medium mb-4">Create New Contact</h3>
                            <form onSubmit={handleCreateContact} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">Name</label>
                                        <input type="text" className="input" required value={contactData.name} onChange={e => setContactData({ ...contactData, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="label">Email</label>
                                        <input type="email" className="input" value={contactData.email} onChange={e => setContactData({ ...contactData, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="label">Type</label>
                                        <select className="input" value={contactData.type} onChange={e => setContactData({ ...contactData, type: e.target.value })}>
                                            <option value="customer">Customer</option>
                                            <option value="vendor">Vendor</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">Phone</label>
                                        <input type="text" className="input" value={contactData.phone} onChange={e => setContactData({ ...contactData, phone: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button type="button" onClick={() => setShowContactForm(false)} className="btn btn-secondary">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contact.type === 'customer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                {contact.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
                <div>
                    <div className="flex justify-end mb-4">
                        <button onClick={() => setShowUserForm(!showUserForm)} className="btn btn-primary">
                            <Plus className="h-4 w-4 mr-2" /> New User
                        </button>
                    </div>

                    {showUserForm && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-medium mb-4">Create New User (Auto-links Contact)</h3>
                            <form onSubmit={handleCreateUser} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">Name</label>
                                        <input type="text" className="input" required value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="label">Email</label>
                                        <input type="email" className="input" required value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="label">Password</label>
                                        <input type="password" className="input" required value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button type="button" onClick={() => setShowUserForm(false)} className="btn btn-secondary">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Create User</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Linked Contact ID</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mr-3">
                                                    {u.name?.[0]}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                                    <div className="text-xs text-gray-500">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{u.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{u.contact_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersAndContacts;
