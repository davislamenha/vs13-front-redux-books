import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/api/authApi/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
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
});

type LoginSchema = z.infer<typeof loginSchema>;

export function Login() {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: LoginSchema) {
    const { email, password } = formData;

    await loginMutation({ email, password })
      .unwrap()
      .then((payload) => {
        console.log("fulfilled", payload);
        localStorage.setItem("token", JSON.stringify(payload.token));
        form.setError("root", {
          type: "success",
          message: "Login bem-sucedido!",
        });

        navigate("/auth/minha-conta");
      })
      .catch((error) => {
        console.error("rejected", error);
        form.setError("root", {
          type: "error",
          message: "Credenciais inválidas.",
        });
      });
  }

  return (
    <div className="flex-1 h-full max-w-screen">
      <div className="pl-4 pr-4 pt-[calc(10%)] pb-12 m-auto flex flex-col items-start gap-16 max-w-[1440px] justify-center text-center">
        <h1 className="w-full text-3xl font-bold">Login</h1>

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
                    <Input placeholder="Email" {...field} />
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
          </form>

          <FormDescription className="w-full">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="ml-2 text-primary">
              Cadastre-se aqui
            </Link>
          </FormDescription>
        </Form>
      </div>
    </div>
  );
}
