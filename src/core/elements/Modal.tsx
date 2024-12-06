import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useGlobalState } from "@/context/globalStateProvider";
import PayCard from "../modules/otherPayCard";
import { Bank } from "@/context/stateTypes";
import { isDesktop } from "react-device-detect";



const ModalComponent = ({ isOpen, onClose, onSelectBank }: { isOpen: boolean; onClose: () => void; onSelectBank: (bankname: string) => void; }) => {
    const { state } = useGlobalState()

    const [search, setSearch] = useState('')
    const [banks, setBanks] = useState<Bank[]>(state.INB);
    const [filteredBanks, setFilteredBanks] = useState<Bank[]>([])
    // const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            // setLoading(true)
            axios.post('')
                .then((response) => {
                    console.log('response of modal', response)
                    setBanks(state.INB)
                    setFilteredBanks(state.INB)
                })
                .catch((error) => {
                    console.log('Error fetching bank data', error);
                    setBanks(state.INB)
                    setFilteredBanks(state.INB)
                })
            // .finally(() => setLoading(false))
        }
    }, [isOpen])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        setSearch(searchTerm)
        if (!searchTerm.trim()) {
            setFilteredBanks(banks)
        } else {
            const filtered = banks.filter((bank) => {
                return bank.title?.toLowerCase().includes(search.toLowerCase())
            })
            setFilteredBanks(filtered)
        }

    }

    const handleBankSelect = (bank: Bank) => {
        onSelectBank(bank.bankName)
        onClose()
    }

    if (!isOpen) return null;

    return (
        // <div className="w-full bg-white rounded-lg">
        //     <div className=" flex flex-col space-y-4 bg-card text-card-foreground p-6 pt-2 rounded-xl">
        <div className="w-full">
            <div className={`flex flex-col bg-card text-card-foreground ${isDesktop ? "px-0 " : "p-6 pt-2 py-2"} pt-0 rounded-xl`}>
                <div className="flex justify-between items-center pb-0 mb-0">
                    <h3 className="text-lg font-semibold">All Banks</h3>
                    {/* <button onClick={onClose} className="text-gray-600 hover:text-black"> */}
                    <div onClick={onClose}>
                        <X className="h-4 w-4" />
                    </div>
                    {/* </button> */}
                </div>
                {/* Search */}
                <div className="mb-0 mt-5">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-1 border-b  focus:outline-none focus:ring-2 focus:ring-white"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                {/* List */}
                <div className={`${isDesktop ? 'max-h-80' : ''} overflow-y-auto`}>
                    {filteredBanks.map((bank) => (
                        <PayCard onClick={() => {
                            if (!bank.downtime.status) {
                                handleBankSelect(bank)
                            }
                        }
                        } icon={bank.icon} label={bank.title} netBank={true} downtime={bank.downtime.status} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ModalComponent