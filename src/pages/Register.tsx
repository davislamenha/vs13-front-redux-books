import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/redux/api/authApi/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email({
      message: "O email precisa ser válido.",
    }),
    password: z
      .string()
      .min(6, {
        message: "A senha precisa ter ao menos 6 caracteres.",
      })
      .max(20, {
        message: "A senha não pode ser maior que 20 caracteres.",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "A senha precisa ter ao menos 6 caracteres.",
      })
      .max(20, {
        message: "A senha não pode ser maior que 20 caracteres.",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.path.push("confirmPassword");
      ctx.addIssue({
        code: "custom",
        message: "As senhas precisam ser idênticas.",
      });
    }
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export function Register() {
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(formData: RegisterSchema) {
    const { email, password, confirmPassword } = formData;

    await registerMutation({ email, password, confirmPassword })
      .unwrap()
      .then((payload) => {
        console.log("fulfilled", payload);

        form.setError("root", {
          type: "success",
          message: "Registro concluído!",
        });

        form.setValue("email", "");
        form.setValue("password", "");
        form.setValue("confirmPassword", "");
      })
      .catch((error) => {
        console.error("rejected", error);

        if (error.status === 400) {
          form.setError("root", {
            type: "error",
            message: "Email já cadastrado.",
          });
        } else {
          form.setError("root", {
            type: "error",
            message: "Algo deu errado, por favor tente novamente mais tarde.",
          });
        }
      });
  }

  return (
    <div className="flex-1 max-w-screen">
      <div className="pl-4 pr-4 pt-[calc(10%)] pb-12 m-auto flex flex-col items-start gap-16 max-w-[1440px] justify-center text-center">
        <h1 className="w-full text-3xl font-bold">Cadastro</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full max-w-md gap-4 m-auto"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Email" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Senha"
                      autoComplete="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Confirmar senha"
                      autoComplete="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex items-center justify-center w-full gap-2 disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="p-2 border-2 rounded-full size-5 border-primary-foreground/50 border-t-primary-foreground animate-spin"></svg>{" "}
                  Carregando...
                </>
              ) : (
                "Enviar"
              )}
            </Button>
            {form.formState.errors.root?.message && (
              <p
                className={`${
                  form.formState.errors.root.type === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {form.formState.errors.root?.message}
              </p>
            )}
            {form.formState.errors.root?.type === "success" && (
              <Button>
                <NavLink to={"/auth"}>Login</NavLink>
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
