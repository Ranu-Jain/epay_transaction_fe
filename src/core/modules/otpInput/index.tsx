import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import {
  InputOTP,
  InputOTPSlot,
} from "@/library"
import { zodResolver } from "@hookform/resolvers/zod"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useForm } from "react-hook-form"
import { z } from "zod"


const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

interface InputOTPFormProps {
  otp: string
  setOtp: (value: string) => void
}

const InputOTPPattern = ({ otp, setOtp }: InputOTPFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="pin"
          render={({ }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e)
                  }
                  }
                  style={{ display: 'flex' }}
                >
                  <InputOTPSlot index={0} className="border border-[#00A9E0] rounded-lg p-2" />
                  <InputOTPSlot index={1} className="border border-[#00A9E0] rounded-lg p-2" />
                  <InputOTPSlot index={2} className="border border-[#00A9E0] rounded-lg p-2" />
                  <InputOTPSlot index={3} className="border border-[#00A9E0] rounded-lg p-2" />
                  <InputOTPSlot index={4} className="border border-[#00A9E0] rounded-lg p-2" />
                  <InputOTPSlot index={5} className="border border-[#00A9E0] rounded-lg p-2" />
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </form>
    </Form>
  )
}

export default InputOTPPattern