import { ErrorMessage } from "@/core/elements/errorMessage";
import { Input } from "@/core/elements/input";
import { cardValidationSchema, formatCreditCardNumber, formatCVC, formatExpirationDate, validateCardNumber, } from "@/utils/helper";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BackButton from "@/core/modules/backButton";
import OtpSheet from "@/core/modules/otpSheet";
import { isDesktop } from "react-device-detect";
import { americanExpress, masterCard, rupay, visa } from "@/utils/constants";
import cardValidator from 'card-validator'
import { CardRefType } from "@/types/components";


const DebitCard = forwardRef<CardRefType>((_: any, ref) => {
    useImperativeHandle(ref, () => ({
        triggerAction() {
            if (validateForm()) {
                setOtpSheetOpen(true)
            }
        }
    }));

    const [cardNumber, setCardNumber] = useState('')
    const [cardHolder, setCardHolder] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [isKeyDown, setIsKeyDown] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [otpSheetOpen, setOtpSheetOpen] = useState(false)
    const [timer, setTimer] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const [timeLeft, setTimeLeft] = useState(180)
    const [cardError, setCardError] = useState('')
    const [expiryError, setExpiryError] = useState('')
    const [cvvError, setCvvError] = useState('')
    const [cardType, setCardType] = useState('')

    const {
        control,
        trigger,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(cardValidationSchema),
        mode: "onChange"
    })


    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(countdown)
                    return 0;
                }
                return prevTime - 1;
            })
        }, 1000);
        return () => clearInterval(countdown)
    }, [timeLeft])

    useEffect(() => {
        if (!canResend) {
            const countdown = setInterval(() => {
                setTimer((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(countdown)
                        setCanResend(true)
                        return 0;
                    }
                    return prevTime - 1;
                })
            }, 1000)
            return () => clearInterval(countdown)
        }
    }, [canResend])

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
    }

    const handleResendOTP = () => {
        setTimer(60)
        setCanResend(false)
    }

    const handleKeyDown = (event: any) => {
        event.key === 'Backspace' ? setIsKeyDown(true) : setIsKeyDown(false)
    }


    const validateForm = () => {
        if (cardNumber.length < 1 && cardHolder.length < 1 && expiryDate.length < 1 && cvv.length < 1) {
            setCardError('Card number is required');
            setErrorMessage('Cardholder name is required')
            setExpiryError('Expiry date is required');
            setCvvError('Cvv is required')
            return false
        }
        else if (cardNumber.length < 1) {
            setCardError('Card number is required');
            return false
        }
        else if (cardType !== 'visa' && cardType !== 'mastercard' && cardType !== 'american-express' && cardType !== 'maestro') {
            setCardError('This cards not allowed. It is out of India')
            return false
        }
        else if (validateCardNumber(cardNumber)) {
            setCardError('Invalid card number')
            return false
        }
        setCardError('')

        if (cardHolder.length < 1) {
            setErrorMessage('Cardholder name is required')
            return false
        }
        setErrorMessage('')

        if (expiryDate.length < 1) {
            setExpiryError('Expiry date is required');
            return false
        }
        setExpiryError('')

        if (cvv.length < 1) {
            setCvvError('Cvv is required')
            return false
        }
        setCvvError('')

        if (cardType === 'visa' && cvv.length !== 3) {
            setCvvError('CVV must be 3 digits for Visa')
            return false
        }
        setCvvError('')

        if (cardType === 'mastercard' && cvv.length !== 4) {
            setCvvError('CVV must be 4 digits for Mastercard')
            return false
        }
        setCvvError('')

        if (cardType === 'maestro' && cvv.length !== 3) {
            setCvvError('CVV must be 3 digits for Rupay')
            return false;
        }
        setCvvError('')

        if (cardType === 'american-express' && cvv.length !== 3) {
            setCvvError('CVV must be 3 digits for American Express')
            return false;
        }
        setCvvError('')

        if (Object.keys(errors).length > 0) {
            return false
        }
        if (cvvError !== '' || expiryError !== '' || cardError !== '' || errorMessage !== '') {
            return false
        }
        return true;
    }

    const handleInputChange = ({ target }: any) => {
        if (target.id == 'expiryDate') {
            let data = formatExpirationDate(target.value, isKeyDown)
            setExpiryDate(data.value)
        } else if (target.id == 'cardNumber') {
            const input = target.value
            const validation = cardValidator.number(input)
            if (input.length >= 1) {
                if (validation.card) {
                    setCardType(validation.card.type)
                }
            } else {
                setCardType("")
            }

            let data = formatCreditCardNumber(target.value)
            setCardNumber(data.trim())
        } else if (target.id == 'cvv') {
            target.value = formatCVC(target.value)
            setCvv(target.value)
        }
    }

    const toggleSheet = () => setOtpSheetOpen(!otpSheetOpen)
    const closeSheet = () => setOtpSheetOpen(false)

    return (
        <div className="w-full h-[85%] bg-white rounded-lg">
            <div className={`flex flex-col bg-card text-card-foreground ${isDesktop ? "px-0" : "p-6 pt-2 py-2"} pt-0 rounded-xl `}>
                {!isDesktop ? <BackButton pageName={"Card details"} /> : <BackButton pageName={"Cards"} />}
                <form className={'space-y-6'} >
                    <Controller
                        name='cardNumber'
                        control={control}
                        render={({ field }) =>
                            <Input label={'Card Number'}
                                name='Card Number'
                                value={cardNumber}
                                placeholder="Card Number"
                                onChange={handleInputChange}
                                onBlur={(e) => {
                                    field.onChange(e)
                                    trigger('cardNumber')
                                }}
                                id="cardNumber"
                                className={`mt-0 ${errors.cardNumber ?
                                    'border-red-500' : cardError ?
                                        'border-red-500' : "mb-0"}`}
                                error={`${errors?.cardNumber ?
                                    errors?.cardNumber?.message || "" : cardError}`}
                                icon={cardType == 'maestro' ?
                                    rupay : cardType == 'visa' ?
                                        visa : cardType == 'mastercard' ?
                                            masterCard : cardType == 'american-express' ?
                                                americanExpress : ''}
                                iconClassName={" bottom-20 h-5 w-10 top-[1px]"}
                            />}
                    />
                    <Controller
                        name='cardHolder'
                        control={control}
                        render={({ field }) =>
                            <Input label={"Card Holder's Name"}
                                name="Card Holder's Name"
                                value={cardHolder}
                                type="text"
                                pattern="[A-Za-z\s]+"
                                placeholder="Card Holder's Name"
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (/^[A-Za-z\s]*$/.test(newValue)) {
                                        setCardHolder(e.target.value)
                                    }
                                }}
                                onBlur={(e) => {
                                    if (cardHolder.length < 1) {
                                        setErrorMessage('Cardholder name is required')
                                    } else {
                                        setErrorMessage('')
                                        field.onChange(e)
                                        trigger('cardHolder')
                                    }

                                }}
                                maxLength={50}
                                id="cardHolder"
                                className={`mt-0 ${errors.cardHolder ? 'border-red-500' : errorMessage ? 'border-red-500' : ""}`}
                                error={`${errorMessage ? errorMessage : errors?.cardHolder?.message || ""}`}
                            />
                        }
                    />
                    <div className="flex space-x-2">
                        <div className="relative w-1/2">
                            <Controller
                                name='expiryDate'
                                control={control}
                                render={({ field }) =>
                                    <Input label={'MM/YY'}
                                        name='MM/YY'
                                        value={expiryDate}
                                        type="text"
                                        placeholder="MM/YY"
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        onBlur={(e) => {
                                            field.onChange(e)
                                            trigger('expiryDate')
                                        }}
                                        id="expiryDate"
                                        className={`mt-1 ${expiryError ? 'border-red-500' : errors.expiryDate ? 'border-red-500' : ""}`}
                                        error={`${errors?.expiryDate ? errors?.expiryDate?.message || "" : expiryError}`}
                                    />
                                } />

                        </div>
                        <div className="relative w-1/2">
                            <Controller
                                name='cvv'
                                control={control}
                                render={({ field }) =>
                                    <Input label={'CVV'}
                                        name='CVV'
                                        value={cvv}
                                        type="password"
                                        placeholder="CVV"
                                        onChange={handleInputChange}
                                        maxLength={cardType === 'visa' ? 3 : cardType === 'mastercard' ? 3 : cardType === 'maestro' ? 3 : cardType === 'american-express' ? 4 : 3}
                                        onBlur={(e) => {
                                            field.onChange(e)
                                            trigger('cvv')
                                        }}
                                        id="cvv"
                                        className={`mt-1 ${cvvError ? 'border-red-500' : errors.cvv ? 'border-red-500' : ""}`}
                                        error={`${errors?.cvv ? errors?.cvv?.message || "" : cvvError}`}
                                    />
                                } />


                        </div>
                    </div>
                    <OtpSheet
                        sheetOpen={otpSheetOpen}
                        sheetClose={closeSheet}
                        toggleSheet={toggleSheet}
                        onResendClick={handleResendOTP}
                        disabled={!canResend}
                        canResend={canResend}
                        timer={timer}
                        formatTime={formatTime}
                        timeLeft={timeLeft}
                    />
                </form>
                {
                    <ErrorMessage
                        message="VISA Credit Card is experience high failure. Please try other pay modes"
                    />
                }
            </div>
        </div>
    )
})

export default DebitCard