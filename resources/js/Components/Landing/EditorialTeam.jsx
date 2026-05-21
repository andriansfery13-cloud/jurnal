import { motion } from 'framer-motion';
import { getInitials } from '@/lib/utils';

export default function EditorialTeam({ members = [] }) {
    const defaultMembers = [
        { name: 'Prof. Dr. Ahmad Rifai', role: 'editor_in_chief', affiliation: 'University of Indonesia', orcid_id: '0000-0001-2345-6789' },
        { name: 'Dr. Siti Nurhaliza', role: 'managing_editor', affiliation: 'Gadjah Mada University', orcid_id: '0000-0002-3456-7890' },
        { name: 'Dr. Budi Santoso', role: 'section_editor', affiliation: 'Bandung Institute of Technology', orcid_id: '0000-0003-4567-8901' },
        { name: 'Dr. Maya Indrawati', role: 'section_editor', affiliation: 'Airlangga University', orcid_id: '0000-0004-5678-9012' },
    ];

    const team = members.length > 0 ? members : defaultMembers;
    const roleLabels = { editor_in_chief: 'Editor-in-Chief', managing_editor: 'Managing Editor', section_editor: 'Section Editor', editorial_board: 'Editorial Board' };

    return (
        <section className="relative py-24 bg-navy-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Editorial <span className="text-gradient-gold">Board</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Distinguished scholars leading our peer review process</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-6 text-center hover:border-gold-500/30 hover:shadow-glow-gold transition-all duration-500 group">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4 text-navy-950 text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                                {member.photo ? <img src={member.photo} alt={member.name} className="w-full h-full rounded-2xl object-cover" /> : getInitials(member.name)}
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1">{member.name}</h3>
                            <p className="text-xs font-medium text-gold-400 mb-2">{roleLabels[member.role] || member.role}</p>
                            <p className="text-xs text-gray-500 mb-3">{member.affiliation}</p>
                            {member.orcid_id && (
                                <a href={`https://orcid.org/${member.orcid_id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors">
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.209-.619-3.722-3.788-3.722h-2.531z" /></svg>
                                    ORCID
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
